google.charts.load('current', {'packages':['corechart']});

var windData = [];
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
