google.charts.load('current', {'packages':['corechart']});

var dailyRainData = [
];
function drawDailyRainChart(fetchedData) {
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

    var chart = new google.visualization.AreaChart(document.getElementById('daily-rain'));
    chart.draw(data, options);
}
