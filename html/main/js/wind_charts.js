google.charts.load('current', {'packages':['corechart']});

var windData = [
    ['10/23',  1000],
    ['10/24',  1170],
    ['10/25',  660],
    ['10/26',  1030]
];
function drawWindChart(fetchedData) {
    var data = [
        ['Date', 'Wind Force Scale'],
    ];
    for (d in fetchedData) {
        data.push(fetchedData[d]);
    }
    data = google.visualization.arrayToDataTable(data);

    var options = {
        legend: 'none',
        title: 'Wind Force Scale, in kts',
        vAxis: {minValue: 0},
        colors:['#028700']
    };

    var chart = new google.visualization.AreaChart(document.getElementById('wind'));
    chart.draw(data, options);
}
