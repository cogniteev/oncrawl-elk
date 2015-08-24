#!/bin/sh -e

if [ "xES_INDEX" = x ] ;then
  echo >&2 <<EOF
Error: Elasticsearch index to export is not specified.
Expecting ES_INDEX environment variable.
Abort.
EOF
  exit 1
fi

if [ "x${ELASTICSEARCH_PORT_9200_TCP_PORT}" = x ] ; then
  echo >&2 "Error: elasticsearch container does not seem to be linked."
  exit 1
fi

ES_URL="http://elasticsearch:${ELASTICSEARCH_PORT_9200_TCP_PORT}"

mkdir -p /data

elasticdump                                 \
  --input="${ES_URL}/${ES_INDEX}"           \
  --output="/data/${ES_INDEX}-mapping.json" \
  --type mapping

elasticdump                               \
  --input="${ES_URL}/${ES_INDEX}"         \
  --output="/data/${ES_INDEX}-data.json"  \
  --type data
