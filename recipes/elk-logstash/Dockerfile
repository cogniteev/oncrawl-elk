FROM logstash:1.5.3

ONBUILD ADD . /config
CMD ["logstash", "-f", "/config/*.conf"]
