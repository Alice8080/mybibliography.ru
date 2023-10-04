const dataSources = (sources) => {
    const data = {
        labels: ['2022', '2023'],
        datasets: [
            {
                label: 'Книги',
                data: [41441, Number(sources.books) - 41441],
                backgroundColor: [
                    '#f53838',
                ],
                hoverBackgroundColor: [
                    '#f53838',
                ],
                borderRadius: 10,
            },
            {
                label: 'Сайты',
                data: [40409, Number(sources.sites) - 40409],
                backgroundColor: [
                    '#F3645B',
                ],
                hoverBackgroundColor: [
                    '#F3645B',
                ],
                borderRadius: 10,
            },
            {
                label: 'Статьи с сайтов',
                data: [24859, Number(sources.site_articles) - 24859],
                backgroundColor: [
                    '#E55C8C',
                ],
                hoverBackgroundColor: [
                    '#E55C8C',
                ],
                borderRadius: 10,
            },
            {
                label: 'Статьи из журналов',
                data: [27835, Number(sources.magazine_articles) - 27835],
                backgroundColor: [
                    '#C349FF',
                ],
                hoverBackgroundColor: [
                    '#C349FF',
                ],
                borderRadius: 10,
            },
            {
                label: 'Остальные источники',
                data: [44117, Number(sources.others) - 44117],
                backgroundColor: [
                    '#801DFF',
                ],
                hoverBackgroundColor: [
                    '#801DFF',
                ],
                borderRadius: 10,
            },
        ],
    };
    return data;
}

export default dataSources;