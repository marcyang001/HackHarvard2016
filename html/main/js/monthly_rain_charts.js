google.charts.load('current', {'packages': ['corechart']});

// rain data
/*
 ["10", 8.94],
    ["11", 10.49],
    ["12", 19.30]
*/
var monthlyRainData = [
   
];

google.charts.load("current", {packages: ["corechart"]});
function drawMonthlyRainChart(fetchedData) {

    var data = [
        ['Month', 'Precipitation Forecast'],
    ];
    for (d in fetchedData) {
        data.push(fetchedData[d]);
    }
    data = google.visualization.arrayToDataTable(data);

    var options = {
        legend: 'none',
        title: 'Monthly precipitaion forecast, in IN',
        vAxis: {minValue: 0},
        colors:['#1528d6']
    };

    var chart = new google.visualization.AreaChart(document.getElementById('monthly-rain'));
    chart.draw(data, options);

}
