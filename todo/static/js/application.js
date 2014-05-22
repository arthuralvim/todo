var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg.axis().scale(y).orient("left");

var area = d3.svg.area().x(function(d) { return x(d.date); }).y0(height)
    .y1(function(d) { return y(d.close); });

var width_svg = width + margin.left + margin.right
var height_svg = height + margin.top + margin.bottom

var svg = d3.select("#chart").append("svg")
    .attr("id", 'area-chart')
    .attr("width", width_svg)
    .attr("height", height_svg)
    .attr("perserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width_svg + " " + height_svg)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("js/data/data-area-chart.tsv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);
    svg.append("path").datum(data).attr("class", "area").attr("d", area);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Price ($)");
});

var chart = $("#area-chart"),
    aspect = chart.width() / chart.height(),
    container = $("#chart").parent();

function resize() {
    var targetWidth = container.width();
    var targetHeight = Math.round(targetWidth / aspect);
    chart.attr("width", targetWidth);
    chart.attr("height", targetHeight);
}

d3.select(window).on('resize', resize);


