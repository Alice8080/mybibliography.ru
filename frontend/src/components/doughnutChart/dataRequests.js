const dataRequests = (requests) => {
    const data = {
        labels: ['2022', '2023'],
        datasets: [
            {
                label: 'Поисковые запросы',
                data: [78640, Number(requests) - 78640],
                backgroundColor: [
                    '#f53838',
                ],
                hoverBackgroundColor: [
                    '#f53838',
                ],
                borderRadius: 10,
            },
        ],
    };

    return data;
}

export default dataRequests;