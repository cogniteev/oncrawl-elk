FROM cogniteev/elasticdump:0.14.3
ADD docker-entrypoint.sh /
ONBUILD ADD . /kibana-config/
ENTRYPOINT ["/docker-entrypoint.sh"]
