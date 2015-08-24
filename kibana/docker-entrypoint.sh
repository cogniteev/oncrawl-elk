#!/bin/bash

set -e

# Add kibana as command if needed
if [[ "$1" == -* ]]; then
	set -- kibana "$@"
fi

# Run as user "kibana" if the command is "kibana"
if [ "$1" = 'kibana' ]; then
	if [ "$ELASTICSEARCH_URL" -o "$ELASTICSEARCH_PORT_9200_TCP" ]; then
		: ${ELASTICSEARCH_URL:='http://elasticsearch:9200'}
		sed -ri "s!^(elasticsearch_url:).*!\1 '$ELASTICSEARCH_URL'!" /opt/kibana/config/kibana.yml
	else
		echo >&2 'warning: missing ELASTICSEARCH_PORT_9200_TCP or ELASTICSEARCH_URL'
		echo >&2 '  Did you forget to --link some-elasticsearch:elasticsearch'
		echo >&2 '  or -e ELASTICSEARCH_URL=http://some-elasticsearch:9200 ?'
		echo >&2
	fi

  # Wait for .kibana-config index to be created if necessary
  for i in `seq 60` ; do
    if curl -s "${ELASTICSEARCH_URL}"/_cat/indices 2>/dev/null | \
			 grep -q " open .kibana-config" ; then
      break
    fi
		echo >&2 "Waiting for kibana-config container"
    sleep 1
  done
	if ! curl -s "${ELASTICSEARCH_URL}"/_cat/indices 2>/dev/null | \
			grep -q " open .kibana-config" ; then
  	echo >&2 'Fatal: .kibana-config index does not exists. Timeout error.'
		exit 1
	else
		echo >&2 '.kibana-config index is now opened.'
		status=$(curl -s "${ELASTICSEARCH_URL}/.kibana-config/status/init?pretty=t" 2>/dev/null | \
			grep -A1 _source | grep '"status"' | cut -d: -f2 | sed 's/.*"\([^"]*\)".*/\1/')
		curl -s -XDELETE "${ELASTICSEARCH_URL}/.kibana-config" >/dev/null 2>&1
		if [ "x$status" != xsuccess ] ;then
			echo >&2 ".kibana index initialization failed. Abort!"
			exit 1
		fi
	fi

	set -- gosu kibana "$@"
fi

exec "$@"
