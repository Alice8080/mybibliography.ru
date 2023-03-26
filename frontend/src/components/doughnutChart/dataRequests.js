const dataRequests = (requests) => {
    const data = {
        labels: ['2022', 'сейчас'],
        datasets: [
            {
                label: 'Поисковые запросы',
                data: [78640, requests],
                backgroundColor: [
                    '#FF753E',
                ],
                hoverBackgroundColor: [
                    '#FF753E',
                ],
                borderRadius: 10,
            },
        ],
    };

    return data;
}

export default dataRequests;