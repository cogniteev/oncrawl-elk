#!/bin/sh -e

CONFIG_DIR=/kibana-config

put_status() {
  curl -s -XPUT elasticsearch:9200/.kibana-config/status/init -d "{
    \"status\": \"$1\"
  }" >/dev/null 2>&1
}

error() {
  echo >&2 $@
  put_status error
  exit 1
}

if [ "x${ELASTICSEARCH_PORT_9200_TCP_PORT}" = x ] ; then
  error "Error: elasticsearch container does not seem to be linked."
fi

ES_URL="http://elasticsearch:${ELASTICSEARCH_PORT_9200_TCP_PORT}"

# Wait for Elasticsearch
for i in `seq 60` ; do
  if curl -s "$ES_URL" 2>/dev/null | grep -q lucene_version ; then
    break
  fi
  sleep 1
done
echo >&2 'Elasticsearch node is up'

if ! [ -f "$CONFIG_DIR/mapping.json" -a -f "$CONFIG_DIR/data.json" ] ; then
  echo "Could not find mapping.json and data.json files. Start empty Kibana" >&2
  put_status success
  exit 0
fi

if ! curl -s "${ES_URL}"/_cat/indices 2>/dev/null | \
    grep -q " open .kibana" ; then
  echo >&2 ".kibana index is missing. Initializing it."
  elasticdump                           \
    --debug                             \
    --input="$CONFIG_DIR/mapping.json"  \
    --output="$ES_URL/.kibana"          \
    --type=mapping

  elasticdump                           \
    --debug                             \
    --input="$CONFIG_DIR/data.json"     \
    --output="$ES_URL/.kibana"          \
    --type=data
else
  echo ".kibana index already exists. Nothing to do."
fi
put_status success
