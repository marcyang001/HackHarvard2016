/**
 * Created by Ericp on 2016-10-22.
 */

var avgTempData = [];

function drawAvgTempChart(fetchedData) {
    var data = [
        ['Date', 'Avg High', 'High', 'Avg Low', 'Low']
    ];
    for (d in fetchedData) {
        data.push(fetchedData[d]);
    }
    data = google.visualization.arrayToDataTable(data);

    var options = {
        title: 'Average (based on past 30 years) High and Low Temperature in next three months',
        curveType: 'function',
        legend: {position: 'bottom'},
        colors: ['#ff2714', '#ff8914', '#1462ff', '#19bdff']
    };

    var chart = new google.visualization.LineChart(document.getElementById('avgtemp'));

    chart.draw(data, options);
}