const dataSources = (sources) => {
    const data = {
        labels: ['2022', 'сейчас'],
        datasets: [
            {
                label: 'Книги',
                data: [41441, sources.books],
                backgroundColor: [
                    '#FF753E',
                ],
                hoverBackgroundColor: [
                    '#FF753E',
                ],
                borderRadius: 10,
            },
            {
                label: 'Сайты',
                data: [40409, sources.sites],
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
                data: [24859, sources.site_articles],
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
                data: [27835, sources.magazine_articles],
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
                data: [44117, sources.others],
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