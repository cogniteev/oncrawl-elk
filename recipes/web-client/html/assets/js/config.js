var Config = {
    kibana: {
        url: location.protocol + '//' + location.hostname + ':5601'
    },
    startingDate: undefined,
    endingDate: undefined,
    pages: {
        'overview/bots-activity': [
            {
                row: 1,
                col: 2,
                sizex: 3,
                sizey: 2,
                title: 'Pages crawled',
                id: 'Pages-crawled',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count)),listeners:(),params:(fontSize:'40'),type:metric))"
            },
            {
                row: 1,
                col: 5,
                sizex: 4,
                sizey: 2,
                title: 'Unique pages crawled',
                id: 'Unique-crawled-pages',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(field:request.raw),schema:metric,type:cardinality)),listeners:(),params:(fontSize:'40'),type:metric))"
            },
            {
                row: 1,
                col: 9,
                sizex: 3,
                sizey: 2,
                title: 'Googlebots distribution',
                id: 'Googlebots-distribution',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:bot.raw,order:desc,orderBy:'1',size:5),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!t,shareYAxis:!t),type:pie))"
            },
            {
                row: 3,
                col: 2,
                sizex: 10,
                sizey: 3,
                title: 'Top urls crawled (50)',
                id: 'Top-urls-crawled-(50)',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:request.raw,order:desc,orderBy:'1',size:50),schema:bucket,type:terms)),listeners:(),params:(perPage:10,showMeticsAtAllLevels:!f,showPartialRows:!f),type:table))"
            }
        ],
        'overview/pages-performances': [
            {
                row: 1,
                col: 2,
                sizex: 5,
                sizey: 3,
                title: 'Status distribution',
                id: 'Status-distribution',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:response,order:desc,orderBy:'1',size:50),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!t,shareYAxis:!t),type:pie))"
            },
            {
                row: 1,
                col: 7,
                sizex: 5,
                sizey: 3,
                title: 'Status and Googlebots distribution',
                id: 'Status-and-Googlebots-distribution',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:response,order:desc,orderBy:'1',size:5),schema:segment,type:terms),(id:'3',params:(field:bot.raw,order:desc,orderBy:'1',size:5),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),type:histogram))"
            },
            {
                row: 4,
                col: 2,
                sizex: 3,
                sizey: 2,
                title: '200',
                id: '200',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!t,query:(query_string:(query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count)),listeners:(),params:(fontSize:'40'),type:metric))"
            },
            {
                row: 4,
                col: 5,
                sizex: 3,
                sizey: 2,
                title: '3xx',
                id: '3xx',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!t,query:(query_string:(query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count)),listeners:(),params:(fontSize:'40'),type:metric))"
            },
            {
                row: 4,
                col: 8,
                sizex: 2,
                sizey: 2,
                title: '404',
                id: '404',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!t,query:(query_string:(query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count)),listeners:(),params:(fontSize:'40'),type:metric))"
            },
            {
                row: 4,
                col: 10,
                sizex: 2,
                sizey: 2,
                title: '5xx',
                id: '5xx',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!t,query:(query_string:(query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count)),listeners:(),params:(fontSize:'40'),type:metric))"
            },
            {
                row: 6,
                col: 2,
                sizex: 10,
                sizey: 3,
                title: 'Top pages crawled (50) / status',
                id: 'Crawled-pages-TOP-50-slash-status',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:request.raw,order:desc,orderBy:'1',size:50),schema:bucket,type:terms),(id:'3',params:(field:response,order:desc,orderBy:'1',size:50),schema:bucket,type:terms)),listeners:(),params:(perPage:10,showMeticsAtAllLevels:!t,showPartialRows:!f),type:table))"
            },
            {
                row: 9,
                col: 2,
                sizex: 5,
                sizey: 2,
                title: 'Average bytes',
                id: 'Average-bytes',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(field:bytes),schema:metric,type:avg)),listeners:(),params:(fontSize:'40'),type:metric))"
            },
            {
                row: 9,
                col: 7,
                sizex: 5,
                sizey: 2,
                title: 'Too heavy pages',
                id: 'Too-heavy-pages',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!t,query:(query_string:(query:'*')),vis:(aggs:!((id:'1',params:(field:request.raw),schema:metric,type:cardinality)),listeners:(),params:(fontSize:'40'),type:metric))"
            },
            {
                row: 11,
                col: 2,
                sizex: 10,
                sizey: 3,
                title: 'Top heaviest pages (50)',
                id: 'Top-heaviest-pages',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(field:bytes),schema:metric,type:max),(id:'2',params:(),schema:metric,type:count),(id:'3',params:(field:request.raw,order:desc,orderBy:'1',size:50),schema:bucket,type:terms)),listeners:(),params:(perPage:10,showMeticsAtAllLevels:!f,showPartialRows:!f),type:table))"
            }
        ],
        'overview/focus-main-pages': [
            {
                row: 1,
                col: 2,
                sizex: 4,
                sizey: 4,
                title: 'Page group distribution',
                id: 'Page-group-distribution',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(field:request.raw),schema:metric,type:cardinality),(id:'2',params:(field:category,order:desc,orderBy:'1',size:50),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!f,shareYAxis:!t),type:pie))"
            },
            {
                row: 1,
                col: 6,
                sizex: 6,
                sizey: 4,
                title: 'Page group crawl distribution',
                id: 'Page-group-crawl-distribution',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:request.raw),schema:metric,type:cardinality),(id:'3',params:(field:category,order:desc,orderBy:'1',size:50),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:9,scale:linear,setYExtents:!f,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:()),type:line))"
            },
            {
                row: 5,
                col: 2,
                sizex: 7,
                sizey: 4,
                title: 'Page group and status distribution',
                id: 'Page-group-and-status-distribution',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:category,order:desc,orderBy:'1',size:50),schema:segment,type:terms),(id:'3',params:(field:response,order:desc,orderBy:'1',size:50),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),type:histogram))"
            },
            {
                row: 5,
                col: 9,
                sizex: 3,
                sizey: 3,
                title: 'Page group average bytes',
                id: 'Group-page-average-bytes',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(field:bytes),schema:metric,type:avg),(id:'2',params:(field:category,order:desc,orderBy:'1',size:50),schema:bucket,type:terms)),listeners:(),params:(perPage:10,showMeticsAtAllLevels:!f,showPartialRows:!f),type:table))"
            }
        ],
        'daily-monitoring/crawl': [
            {
                row: 1,
                col: 2,
                sizex: 6,
                sizey: 4,
                title: 'Crawl / day',
                id: 'Crawl-slash-day',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'3',params:(field:request.raw),schema:metric,type:cardinality),(id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:segment,type:date_histogram)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),type:histogram))"
            },
            {
                row: 1,
                col: 8,
                sizex: 4,
                sizey: 4,
                title: 'Crawl / day details',
                id: 'Craw-slash-day-details',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'3',params:(field:request.raw),schema:metric,type:cardinality),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:bucket,type:date_histogram)),listeners:(),params:(perPage:10,showMeticsAtAllLevels:!f,showPartialRows:!f),type:table))"
            },
            {
                row: 5,
                col: 2,
                sizex: 6,
                sizey: 4,
                title: 'Crawl / day / Googlebots',
                id: 'Crawl-slash-day-slash-Googlebots',
                params: "&_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:segment,type:date_histogram),(id:'4',params:(field:bot.raw,order:desc,orderBy:'1',size:5),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),type:histogram))"
            },
            {
                row: 5,
                col: 8,
                sizex: 4,
                sizey: 4,
                title: 'Crawl / day / Googlebots details',
                id: 'Craw-slash-day-slash-Googlebots-details',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:bucket,type:date_histogram),(id:'4',params:(field:bot.raw,order:desc,orderBy:'1',size:50),schema:bucket,type:terms),(id:'5',params:(field:request.raw),schema:metric,type:cardinality)),listeners:(),params:(perPage:10,showMeticsAtAllLevels:!f,showPartialRows:!f),type:table))"
            },
            {
                row: 9,
                col: 2,
                sizex: 6,
                sizey: 4,
                title: 'Crawl / day / page group',
                id: 'Crawl-slash-day-slash-page-group',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:segment,type:date_histogram),(id:'4',params:(field:category,order:desc,orderBy:'1',size:50),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),type:histogram))"
            },
            {
                row: 9,
                col: 8,
                sizex: 4,
                sizey: 4,
                title: 'Crawl / day / page group details',
                id: 'Craw-slash-day-slash-page-group-details',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:bucket,type:date_histogram),(id:'4',params:(field:category,order:desc,orderBy:'1',size:50),schema:bucket,type:terms),(id:'5',params:(field:request.raw),schema:metric,type:cardinality)),listeners:(),params:(perPage:10,showMeticsAtAllLevels:!f,showPartialRows:!f),type:table))"
            }
        ],
        'daily-monitoring/pages-performances': [
            {
                row: 1,
                col: 2,
                sizex: 10,
                sizey: 4,
                title: 'Status distribution / day',
                id: 'Status-distribution-slash-day',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(field:response,order:desc,orderBy:'1',size:50),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),type:histogram))"
            },
            {
                row: 5,
                col: 2,
                sizex: 10,
                sizey: 4,
                title: 'Sum of bytes / day',
                id: 'Sum-of-bytes-slash-day',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(field:bytes),schema:metric,type:sum),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:segment,type:date_histogram)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,interpolate:linear,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,smoothLines:!f,times:!(),yAxis:()),type:area))"
            },
            {
                row: 9,
                col: 2,
                sizex: 10,
                sizey: 4,
                title: 'Sum of bytes / page group / day',
                id: 'Sum-of-bytes-slash-page-group-slash-day',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(field:bytes),schema:metric,type:sum),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(field:category,order:desc,orderBy:'1',size:50),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,interpolate:linear,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,smoothLines:!f,times:!(),yAxis:()),type:area))"
            },
            {
                row: 13,
                col: 2,
                sizex: 10,
                sizey: 8,
                title: 'Status distribution by page group / day',
                id: 'Status-distribution-by-page-group-slash-day',
                params: "_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'$from',mode:quick,to:'$to'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(field:response,order:desc,orderBy:'1',size:50),schema:group,type:terms),(id:'4',params:(field:category,order:desc,orderBy:'1',row:!t,size:50),schema:split,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),type:histogram))"
            }
        ]
    }
};