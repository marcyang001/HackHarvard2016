/**
 * Created by Ericp on 2016-10-22.
 */

var avgTempData = [['2004', 1000, 400, 200, 200]];

function drawAvgTempChart(fetchedData) {
    var data = [
        ['Date', 'Avg High', 'High', 'Avg Low', 'Low']
    ];
    for (d in fetchedData) {
        data.push(fetchedData[d]);
    }
    data = google.visualization.arrayToDataTable(data);

    var options = {
        title: 'Company Performance',
        curveType: 'function',
        legend: {position: 'bottom'}
    };

    var chart = new google.visualization.LineChart(document.getElementById('avgtemp'));

    chart.draw(data, options);
}