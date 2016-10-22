google.charts.load('current', {'packages':['corechart']});

var rainData = [
    ['10/23',  1000],
    ['10/24',  1170],
    ['10/25',  660],
    ['10/26',  1030]
];
function drawChart(fetchedData) {
    var data = [
        ['Date', 'Precipitation Forecast'],
    ];
    for (d in fetchedData) {
        data.push(fetchedData[d]);
    }
    data = google.visualization.arrayToDataTable(data);

    var options = {
        legend: 'none',
        title: 'Daily precipitaion forecast for three months, in IN',
        vAxis: {minValue: 0},
        colors:['#4fabf2']
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
