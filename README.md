`OnCrawl ELK` is a preconfigured ELK stack to analyze GoogleBot activity on your website.
It is built with standard pillars such as ELK and docker.


### Getting started

#### Prerequisites

1. [Install Docker with Docker Compose](https://docs.docker.com/compose/install/)
1. Locate your server logs copy them to the machine where you are going to run OnCrawl ELK.
30 days is generally fine. If you have very large log file, start with 1 or 2 days.

#### Install

1. Clone this repository and checkout the `1.0` tag or simply download [1.0 zip](https://github.com/cogniteev/oncrawl-elk/archive/1.0.zip)
1. Starts the `OnCrawl ELK` containers using Docker Compose: `docker-compose -p oncrawlelk -f docker-compose.yml up -d`
1. Visit [http://localhost:9000](http://localhost:9000) or `http://docker-host-ip:9000`. You should see the OnCrawl-ELK dashboard, but there is no data yet. Let's bring some data to analyze.

#### Import log files

Importing data is as easy as copying log access files to the right folder. Logstash start indexing any file found at `logs/apache/*.log` , `logs/nginx/*.log` , `logs/iis/*.log` automatically.

###### Apache/Nginx logs
If your webserver is powered by Apache or NGinx, make sure the format is _combined log format_. They should look like:
```
127.0.0.1 - - [28/Aug/2015:06:45:41 +0200] "GET /apache_pb.gif HTTP/1.0" 200 2326 "http://www.example.com/start.html" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
```
Drop your `.log` files into the `logs/apache` or `logs/nginx` directory accordingly.

###### IIS logs
If your webserver is powered by IIS, you must select the right fields to export in the access log files. The header of the log files should look like:
```
#Fields: date time s-ip cs-method cs-uri-stem cs-uri-query s-port cs-username c-ip cs(User-Agent) cs(Referer)? cs-host? sc-status sc-substatus sc-win32-status time-taken
```
? denotes optionnal fields.

Then copy your `.log` files into the `logs/iis` directory to have logstash analyze them.

###### other formats
If your logs have a different format and you cannot edit the output format to match one supported by the default configuration, have a look at the [Custom logformat](#custom_logformat) section.

#### Play

Go back to [http://localhost:9000](http://localhost:9000) or `http://docker-host-ip:9000`. You should have figures and graphs, __congrats !__


### Going further

##### Exploring the `logstash.conf` file

The logstash configuration file is comprised of 3 sections: input, filter, output.

###### Input
In OnCrawl ELK, the input section contains file directive for the 3 supported formats: apache, nginx and iis. All events read from a file under the `/logs/apache/`directory will be tagged with `type: apache`, and so on for nginx and iis. This tag is later used for filtering.

###### Filter
The filter section does 3 things mainly:

 1. Split the event line into meaningful fields, using the `grok` filter. Based on the value of `type`, hence the event file source, different patterns are applied, namely `%{COMBINEDAPACHELOG}`, `%{NGINXACCESS}` or `%{IISLOG}`.
 2. Based on the user agent, identify what Googlebot from the [Googlebot list](https://support.google.com/webmasters/answer/1061943) crawled the page. If no Googlebot is identified, drop the event since we monitor only Googlebot activity here.
 3. Using grok again, apply regex patterns on the url to set the appropriate category field.


At the end of filtering the event contains well structured fields, and enriched information.

###### Output
In the ELK stack, the output of choice is elasticsearch.

Notice the `document_id` field that allows to push an event twice while still having only one entry in elasticsearch. Duplicated events are automaticcaly deduplicated for better consistency.

##### Modifying the `logstash.conf` file

In order to modify logstash configuration, edit the files located at `recipes/logstash`. Then use the `docker-compose.dev.yml` compose file:

```shell
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up -d
```

##### <a name="custom_logformat">Custom logformat</a>
If you need to parse a log format that is not supported out of box by oncrawl elk, then you will need to edit the `logstash.conf` file in order to tell logstash and more specifically grok how to extract the relevant information for each line.

The minimum required fields are:
 * timestamp. The date and time of the event, as long as it can be parsed by the [date filter](https://www.elastic.co/guide/en/logstash/current/plugins-filters-date.html).
 * url
 * user agent
 * status code

Parsing a new format involves a few steps:
 1. Add an input entry, and modify the `type` tag.
 ```
	file {
                'path' => '/logs/cutstom/*.log'
                'type' => 'custom'
                'start_position' => 'beginning'
        }
 ```

 2. Build a [grok](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html) pattern that extract relevanr fields for your event lines. Remember, at least timestamp, url, user agent and status code are required.
[Grok constructor](http://grokconstructor.appspot.com/do/match#result) is a great help for this.
Once you have built your pattern, add it to a file in `logstash/conf/patterns`

 1. Add a filter entry, like this one:
 ```
 	if [type] == "custom" {
 		grok {
 		   match => { "message" => "%{MY_CUSTOM_PATTERN}" }
 		}
 
 		date {
 	      # Try to pull the timestamp from the 'timestamp' field (parsed above with
 	      # grok). The apache time format looks like: "18/Aug/2011:05:44:34 -0700"
 	      match => [ "timestamp", "dd/MMM/yyyy:HH:mm:ss Z" ]
 	      locale => 'en'
 	    }
 	}
 ```
 Don't forget to adapt the date match if necessary. Check [date filter help](https://www.elastic.co/guide/en/logstash/current/plugins-filters-date.html) for this.

##### Custom page categories
By default the category of a page is the first element of its path. e.g https://www.elastic.co/guide/en/logstash/current/plugins-filters-date.html => /guide/

If you want to change this rule for your site, then edit this block of lines:
```
	grok {
		   patterns_dir => "/etc/logstash/patterns"
		   match => { "request" => "/%{PATH_COMPONENT:category}/" }
	}
```
and replace it with one or several grok patterns that fill the `category` tag.

This is a possible example:
```
	grok {
       match => { "request" => "/article/[0-9]{9}.html" }
       add_field => { "category" => "article" }
    }
	grok {
       match => { "request" => "/news/" }
       add_field => { "category" => "news" }
    }

	if ![category] {
		mutate {
			add_field => { "category" => "other" }
		}
	}
```

will produce this result:
 * http://www.example.com/article/123456789.html => "article"
 * http://www.example.com/news/123456789.html => "news"
 * http://www.example.com/article/quadcopter.html => "other"


### Troubleshoot

 * __Connection refused to [http://localhost:9000](http://localhost:9000)__

 Check that the logstash web-client is started properly with kitematic, or with the command:

 ```docker-compose -p oncrawlelk -f docker-compose.yml ps```

If docker is running in a VM, which is the case on OS X and Windows, make sure to replace `localhost` with the ip of the VM running docker.

* __The web-client loads but frames are empty__
Make sure kibana is started using kitematic or this command: 

```docker-compose -p oncrawlelk -f docker-compose.yml ps```

You can issue a full restart with:

```shell
docker-compose -p oncrawlelk -f docker-compose.yml stop
docker-compose -p oncrawlelk -f docker-compose.yml up -d
```

If required, delete the docker containers once stopped with:
```shell
docker-compose -p oncrawlelk -f docker-compose.yml rm
```

* __The web-client loads all frames say no result__
  1. Make sure to select a date windows that match your log files
  2. Analyze logstash log files with kitematic, or this command: ```docker-compose -p oncrawlelk -f docker-compose.yml ps```


### Purge

If you need to purge old logs, you can use [Elastic curator](https://www.elastic.co/guide/en/elasticsearch/client/curator/current/index.html) 

For instance to keep the most recent 100GB of logs:
```shell
docker run --rm --link oncrawlelk_elasticsearch_1:elasticsearch digitalwonderland/elasticsearch-curator --host elasticsearch -n delete --disk-space 100
```

### License

`OnCrawl ELK` is licensed under the Apache License, Version 2.0. See
[LICENSE](LICENSE) file for full license text.
