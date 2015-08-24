FROM logstash:1.5.3

ONBUILD ADD . /etc/logstash/
CMD ["logstash", "-f", "/etc/logstash"]
