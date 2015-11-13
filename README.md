`OnCrawl ELK` is a preconfigured ELK stack to analyze GoogleBot activity on your website.
It is built with standard pillars such as ELK and docker.


### Getting started

#### Prerequisites

1. [Install Docker with Docker Compose](https://docs.docker.com/compose/install/)
2. Locate your server logs copy them to the machine where you are going to run OnCrawl ELK.
30 days is generally fine. If you have very large log file, start with 1 or 2 days.

#### Install

1. [Download ZIP](https://github.com/cogniteev/oncrawl-elk/archive/master.zip) or Fork this repository
1. With docker compose, start `standard.yml`
1. Visit [http://localhost:8080](http://localhost:8080) or `http://docker-host-ip:8080`. You can see the dashboard, but there is no data yet. Let's bring some data to analyze.

#### Import log files

Importing data is as easy as copying log access files to the right folder. Logstash start indexing any file found at `logs/apache/*.log` , `logs/nginx/*.log` , `logs/iis/*.log` automatically.

###### Apache/Nginx logs
If your webserver is powered by Apache or NGinx, make sure the format is _combined log format_. They should look like:
```
127.0.0.1 - - [28/Aug/2015:06:45:41 +0200] "GET /apache_pb.gif HTTP/1.0" 200 2326 "http://www.example.com/start.html" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
```
Drop your `.log` files into the `logs/apache` or `logs/nginx` directory accordingly.

###### IIS logs
If your webserver is powered by IIS, make sure the format is the default log format . They should look like:
```
#TODO
```

and drop your `.log` files into the `logs/iis` directory.

#### Play

Go back to [http://localhost:8080](http://localhost:8080) or `http://docker-host-ip:8080`. You should have figures and graphs, congrats !
If the graphs are still empty, make sure to select the date windows matching your log files.


#### Troubleshoot

TODO

#### Going further

TODO modifying `logstash.conf`

TODO Custom logformat

TODO custom page categories


### Purge

If you need to purge old logs, you can use [Elastic curator](https://www.elastic.co/guide/en/elasticsearch/client/curator/current/index.html) 

For instance to keep the most recent 100GB of logs:
```shell
docker run --rm --link oncrawlelk_elasticsearch_1:elasticsearch digitalwonderland/elasticsearch-curator --host elasticsearch -n delete --disk-space 100
```

### License

`OnCrawl ELK` is licensed under the Apache License, Version 2.0. See
[LICENSE](LICENSE) file for full license text.
