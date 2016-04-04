var Config = {
    kibana: {
       url: '/app/kibana'
    },
    startingDate: undefined,
    endingDate: undefined,
    pages: {
        'crawl-behavior': [
            {
                row: 1,
                col: 1,
                sizex: 4,
                sizey: 2,
                title: 'Unique pages crawled',
                id: 'Unique-crawled-pages'
            },
            {
                row: 1,
                col: 5,
                sizex: 4,
                sizey: 2,
                title: 'Bots hits',
                id: 'Pages-crawled'
            },
            {
                row: 1,
                col: 9,
                sizex: 4,
                sizey: 2,
                title: 'Hits distribution by bot name',
                id: 'Googlebots-distribution'
            },
            {
                row: 3,
                col: 1,
                sizex: 12,
                sizey: 2,
                title: 'Unique pages crawled and bots hits',
                id: 'Crawl-slash-day'
            },
            {
                row: 5,
                col: 1,
                sizex: 12,
                sizey: 2,
                title: 'Bots hits by group per day',
                id: 'Crawl-slash-day-slash-page-group'
            },
            {
                row: 7,
                col: 1,
                sizex: 6,
                sizey: 3,
                title: 'Top 50 pages crawled',
                id: 'Top-pages-crawled-(50)'
            },
            {
                row: 7,
                col: 7,
                sizex: 6,
                sizey: 3,
                title: 'Top 50 resources crawled',
                id: 'Top-ressources-crawled-(50)'
            }
        ],
        'seo-impact': [
            {
                row: 1,
                col: 1,
                sizex: 6,
                sizey: 1,
                title: 'Active pages',
                id: 'Active-pages'
            },
            {
                row: 1,
                col: 7,
                sizex: 6,
                sizey: 1,
                title: 'SEO visits',
                id: 'SEO-visits'
            },
            {
                row: 2,
                col: 1,
                sizex: 6,
                sizey: 2,
                title: 'SEO visits by group',
                id: 'SEO-visits-by-group'
            },
            {
                row: 2,
                col: 7,
                sizex: 6,
                sizey: 2,
                title: 'Active pages by group',
                id: 'Active-pages-by-group'
            },
            {
                row: 4,
                col: 1,
                sizex: 12,
                sizey: 2,
                title: 'SEO visits per day',
                id: 'SEO-visits-per-day'
            },
            {
                row: 6,
                col: 1,
                sizex: 12,
                sizey: 2,
                title: 'SEO visits by group per day',
                id: 'SEO-visits-by-group-per-day'
            },
            {
                row: 8,
                col: 1,
                sizex: 12,
                sizey: 2,
                title: 'Active pages',
                id: 'Active-pages-per-day'
            },
            {
                row: 10,
                col: 1,
                sizex: 12,
                sizey: 2,
                title: 'Active pages by group',
                id: 'Active-pages-by-group-per-day'
            },
            {
                row: 12,
                col: 1,
                sizex: 12,
                sizey: 3,
                title: 'Top 50 active pages',
                id: 'Top-active-pages-(50)'
            }
        ],
        'exploration-sanity': [
            {
                row: 1,
                col: 1,
                sizex: 4,
                sizey: 1,
                title: '200',
                id: '200'
            },
            {
                row: 1,
                col: 5,
                sizex: 4,
                sizey: 1,
                title: '301',
                id: '301'
            },
            {
                row: 1,
                col: 9,
                sizex: 4,
                sizey: 1,
                title: '3xx',
                id: '3xx'
            },
            {
                row: 2,
                col: 1,
                sizex: 4,
                sizey: 1,
                title: '404',
                id: '404'
            },
            {
                row: 2,
                col: 5,
                sizex: 4,
                sizey: 1,
                title: '4xx',
                id: '4xx'
            },
            {
                row: 2,
                col: 9,
                sizex: 4,
                sizey: 1,
                title: '5xx',
                id: '5xx'
            },
            {
                row: 3,
                col: 1,
                sizex: 6,
                sizey: 2,
                title: 'Status codes distribution',
                id: 'Status-distribution'
            },
            {
                row: 3,
                col: 7,
                sizex: 6,
                sizey: 2,
                title: 'Status codes by bots',
                id: 'Status-and-Googlebots-distribution'
            },
            {
                row: 5,
                col: 1,
                sizex: 12,
                sizey: 7,
                title: 'Status codes by group per day',
                id: 'Status-distribution-by-page-group-slash-day'
            },
            {
                row: 12,
                col: 1,
                sizex: 12,
                sizey: 4,
                title: 'Sum of bytes by group per day',
                id: 'Sum-of-bytes-slash-page-group-slash-day'
            }
        ]
    }
};