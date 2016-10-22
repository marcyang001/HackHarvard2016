google.charts.load('current', {'packages': ['corechart']});

// rain data
var rainData = [
    ["10", 8.94],
    ["11", 10.49],
    ["12", 19.30]
];

google.charts.load("current", {packages: ["corechart"]});
function drawChart(fetchedData) {

    var data = [
        ["Element", "Rainfall", {role: "style"}],
    ];
    for (d in fetchedData) {
        fetchedData[d][2] = "gold";
        data.push(fetchedData[d]);
    }
    data = google.visualization.arrayToDataTable(data);
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        },
        2]);

    var options = {
        title: "Daily precipitation forecast for three months, in IN",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: {position: "none"},
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("chart_div"));
    chart.draw(view, options);

}
