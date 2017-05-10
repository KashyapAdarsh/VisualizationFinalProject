var width = 500,
	height = 500;

var colorscale = d3.scale.category10();

var mycfg = {
    w: width,
    h: height,
    maxValue: 0.6,
    levels: 6,
    ExtraWidthX: 300
}

function radar_chart_helper(d, LegendOptions, ID) {
	RadarChart.draw(ID, d, mycfg);

    /* Adding Legend */
	var svg = d3.select(ID)
	.selectAll('svg')
	.append('svg')
	.attr("width", width+300)
	.attr("height", height)

	//Create the title for the legend
	var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", width + 50)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("Top 10 players in the world");

	//Initiate Legend	
	var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", width + 50)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", width + 65)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;
}