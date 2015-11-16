var Config = {
    kibana: {
        url: '/app/kibana'
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
                id: 'Pages-crawled'
            },
            {
                row: 1,
                col: 5,
                sizex: 4,
                sizey: 2,
                title: 'Unique pages crawled',
                id: 'Unique-crawled-pages'
            },
            {
                row: 1,
                col: 9,
                sizex: 3,
                sizey: 2,
                title: 'Googlebots distribution',
                id: 'Googlebots-distribution'
            },
            {
                row: 3,
                col: 2,
                sizex: 10,
                sizey: 3,
                title: 'Top urls crawled (50)',
                id: 'Top-urls-crawled-(50)'
            }
        ],
        'overview/pages-performances': [
            {
                row: 1,
                col: 2,
                sizex: 5,
                sizey: 3,
                title: 'Status distribution',
                id: 'Status-distribution'
            },
            {
                row: 1,
                col: 7,
                sizex: 5,
                sizey: 3,
                title: 'Status and Googlebots distribution',
                id: 'Status-and-Googlebots-distribution'
            },
            {
                row: 4,
                col: 2,
                sizex: 3,
                sizey: 2,
                title: '200',
                id: '200'
            },
            {
                row: 4,
                col: 5,
                sizex: 3,
                sizey: 2,
                title: '3xx',
                id: '3xx'
             },
            {
                row: 4,
                col: 8,
                sizex: 2,
                sizey: 2,
                title: '404',
                id: '404'
            },
            {
                row: 4,
                col: 10,
                sizex: 2,
                sizey: 2,
                title: '5xx',
                id: '5xx'
             },
            {
                row: 6,
                col: 2,
                sizex: 10,
                sizey: 3,
                title: 'Top pages crawled (50) / status',
                id: 'Crawled-pages-TOP-50-slash-status'
            },
            {
                row: 9,
                col: 2,
                sizex: 5,
                sizey: 2,
                title: 'Average bytes',
                id: 'Average-bytes'
            },
            {
                row: 9,
                col: 7,
                sizex: 5,
                sizey: 2,
                title: 'Too heavy pages',
                id: 'Too-heavy-pages'
             },
            {
                row: 11,
                col: 2,
                sizex: 10,
                sizey: 3,
                title: 'Top heaviest pages (50)',
                id: 'Top-heaviest-pages'
            }
        ],
        'overview/focus-main-pages': [
            {
                row: 1,
                col: 2,
                sizex: 4,
                sizey: 4,
                title: 'Page group distribution',
                id: 'Page-group-distribution'
            },
            {
                row: 1,
                col: 6,
                sizex: 6,
                sizey: 4,
                title: 'Page group crawl distribution',
                id: 'Page-group-crawl-distribution'
            },
            {
                row: 5,
                col: 2,
                sizex: 7,
                sizey: 4,
                title: 'Page group and status distribution',
                id: 'Page-group-and-status-distribution'
            },
            {
                row: 5,
                col: 9,
                sizex: 3,
                sizey: 3,
                title: 'Page group average bytes',
                id: 'Group-page-average-bytes'
            }
        ],
        'daily-monitoring/crawl': [
            {
                row: 1,
                col: 2,
                sizex: 6,
                sizey: 4,
                title: 'Crawl / day',
                id: 'Crawl-slash-day'
            },
            {
                row: 1,
                col: 8,
                sizex: 4,
                sizey: 4,
                title: 'Crawl / day details',
                id: 'Craw-slash-day-details'
            },
            {
                row: 5,
                col: 2,
                sizex: 6,
                sizey: 4,
                title: 'Crawl / day / Googlebots',
                id: 'Crawl-slash-day-slash-Googlebots'
            },
            {
                row: 5,
                col: 8,
                sizex: 4,
                sizey: 4,
                title: 'Crawl / day / Googlebots details',
                id: 'Craw-slash-day-slash-Googlebots-details'
            },
            {
                row: 9,
                col: 2,
                sizex: 6,
                sizey: 4,
                title: 'Crawl / day / page group',
                id: 'Crawl-slash-day-slash-page-group'
            },
            {
                row: 9,
                col: 8,
                sizex: 4,
                sizey: 4,
                title: 'Crawl / day / page group details',
                id: 'Craw-slash-day-slash-page-group-details'
            }
        ],
        'daily-monitoring/pages-performances': [
            {
                row: 1,
                col: 2,
                sizex: 10,
                sizey: 4,
                title: 'Status distribution / day',
                id: 'Status-distribution-slash-day'
            },
            {
                row: 5,
                col: 2,
                sizex: 10,
                sizey: 4,
                title: 'Sum of bytes / day',
                id: 'Sum-of-bytes-slash-day'
            },
            {
                row: 9,
                col: 2,
                sizex: 10,
                sizey: 4,
                title: 'Sum of bytes / page group / day',
                id: 'Sum-of-bytes-slash-page-group-slash-day'
            },
            {
                row: 13,
                col: 2,
                sizex: 10,
                sizey: 8,
                title: 'Status distribution by page group / day',
                id: 'Status-distribution-by-page-group-slash-day'
            }
        ]
    }
};