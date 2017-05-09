/* This function creates bar chart */		
function createBarChart(data) {
    var sel = document.getElementById("DropDown");
    var category = sel.options[sel.selectedIndex].text;

    d3.select("svg").remove();
    var elements = Object.keys(data[0]);
    var xLabels = [];

    for (i = 0; i < data.length; i++) {
        xLabels[i] = data[i].X;
    }

    console.log(xLabels);
    
    var margin = {top: 30, right: 20, bottom: 30, left: 40},
        width = 700 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
         
    var xAxis = d3.svg.axis().scale(x);
    var yAxis = d3.svg.axis().scale(y).orient("left");
    
    xAxis.tickFormat(function(d, i){
        return xLabels[i];
    });

    var svg = d3.select("#Graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, function(d) { return i; }) + 1]);
    y.domain([83, d3.max(data, function(d) { return d.Y + 1; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) { return x(i) + 45; })
        .attr("width", 40)
        .attr("y", function(d) { return y(d.Y); })
        .attr("height", function(d) { return height - y(d.Y); })
        .on("mouseover", function(d, i) {
		      d3.select(this).transition()
		      .duration(0)
		      .attr("width", function(d) { return 50;})
              .attr("x", function(d, i) { return parseInt(d3.select(this).attr("x")) - 5; })

	    })
        .on("mouseout", function(d, i) {
		      d3.select(this).transition()
		      .duration(0)
              .attr("width", 40)
              .attr("x", function(d) { return x(i) + 45;; })
	    });
    
    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "axis")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 60)
      .attr("x", 10)
      .attr("fill", "white")
      .attr("font-family", "sans-serif")
      .attr("font-size" , function(d){return 14;})
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "start");


    // add the y Axis
    svg.append("g")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(category);
}