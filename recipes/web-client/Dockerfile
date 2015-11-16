FROM nginx:1.9.6
MAINTAINER Cogniteev <tech@cogniteev.com>

COPY ./config/nginx.conf /etc/nginx/
COPY ./config/default.conf /etc/nginx/conf.d/
COPY ./html /usr/share/nginx/html

CMD ["nginx"]
