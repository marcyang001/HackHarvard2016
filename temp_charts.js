google.charts.load('current', {'packages':['corechart']});

// temperature data
var weatherData = [];

function drawChart(dataRows) {


    var dataTable = new google.visualization.DataTable({
        cols: [
            {id: 'Category', type: 'string'},
            {id: 'Min', type: 'number'},
            {id: 'Initial', type: 'number'},
            {id: 'Final', type: 'number'},
            {id: 'Max', type: 'number'},
            {id: 'Tooltip', type: 'string', role: 'tooltip'}
        ]
    });
    dataTable.addRows(dataRows);
    var options = {
        legend: 'none',
        bar: { groupWidth: '80%' }, // Remove space between bars.
        candlestick: {
            risingColor: { strokeWidth: 0, fill: '#f4c242' }
        },
        title: 'Weather Forecast in three months',
        titleTextStyle: {
            color: '#000',
        },

    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
    chart.draw(dataTable, options);
}