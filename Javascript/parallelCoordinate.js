function createParallelCoordinate(data, ID) {

	console.log("In parallel co-ordinate : " + data);
	var color = d3.scale.category20();

	var margin = {top: 30, right: 10, bottom: 10, left: 10},
	    width = 800 - margin.left - margin.right,
	    height = 400 - margin.top - margin.bottom;

	var x = d3.scale.ordinal().rangePoints([0, width], 1),
	    y = {},
	    dragging = {};

	var line = d3.svg.line(),
	    axis = d3.svg.axis().orient("left"),
	    background,
	    foreground;

	var svg1 = d3.select(ID).append("svg")
	    .attr("width", width + 250 + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    
	var svg = svg1.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/*	var data = [
	  {name: "Audi", economy: 12, cylinder: 5, displacement : 40, power : 85, weight : 85, mph : 45, year :54 },
	  {name: "Benz", economy: 15, cylinder: 3, displacement : 20, power : 35, weight : 90, mph : 89, year :58 },
	  {name: "Maru", economy: 17, cylinder: 2, displacement : 50, power : 25, weight : 100, mph : 70, year :33 }
	];
*/
	  LegendOptions = [];

	  for (i = 0; i < data.length; i++) {
	      LegendOptions.push(data[i].Name);
	  }

	  // Extract the list of dimensions and create a scale for each.
	  x.domain(dimensions = d3.keys(data[0]).filter(function(d) {
	    return d != "Name" && (y[d] = d3.scale.linear()
	        .domain([20, 80])
	        .range([height, 0]));
	  }));

	  console.log(data)

	  // Add grey background lines for context.
	  background = svg.append("g")
	      .attr("class", "background")
	      .selectAll("path")
	      .data(data)
	      .enter().append("path")
	      .attr("d", path);

	  // Add blue foreground lines for focus.
	  foreground = svg.append("g")
	      .attr("class", "foreground")
	      .selectAll("path")
	      .data(data)
	      .enter().append("path")
	      .attr("d", path)
	      .attr({'style': function(d, i) {
	          return "stroke: " + color(i)
	      }});


	  // Add a group element for each dimension.
	  var g = svg.selectAll(".dimension")
	      .data(dimensions)
	      .enter().append("g")
	      .attr("class", "dimension")
	      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
	      .call(d3.behavior.drag()
	        .origin(function(d) { return {x: x(d)}; })
	        .on("dragstart", function(d) {
	          dragging[d] = x(d);
	          background.attr("visibility", "hidden");
	        })
	        .on("drag", function(d) {
	          dragging[d] = Math.min(width, Math.max(0, d3.event.x));
	          foreground.attr("d", path);
	          dimensions.sort(function(a, b) { return position(a) - position(b); });
	          x.domain(dimensions);
	          g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
	        })
	        .on("dragend", function(d) {
	          delete dragging[d];
	          transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
	          transition(foreground).attr("d", path);
	          background
	              .attr("d", path)
	            .transition()
	              .delay(500)
	              .duration(0)
	              .attr("visibility", null);
	        }));

	  // Add an axis and title.
	  g.append("g")
	      .attr("class", "axis_parallel")
	      .each(function(d) { 
	          d3.select(this).call(axis.scale(y[d])); 
	      })
	      .append("text")
	      .style("text-anchor", "middle")
	      .attr("y", -12)
	      .text(function(d) { return d; });

	  // Add and store a brush for each axis.
	  g.append("g")
	      .attr("class", "brush")
	      .each(function(d) {
	        d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush));
	      })
	    .selectAll("rect")
	      .attr("x", -8)
	      .attr("width", 16);

	  //Initiate Legend 
	  var legend = svg1.append("g")
	  .attr("class", "legend")
	  .attr("height", 300)
	  .attr("width", 300)
	  .attr('transform', 'translate(90,20)')
	  ;
	  //Create colour squares
	  legend.selectAll('rect')
	    .data(LegendOptions)
	    .enter()
	    .append("rect")
	    .attr("x", 650 + 50)
	    .attr("y", function(d, i){ return i * 30;})
	    .attr("width", 20)
	    .attr("height", 20)
	    .style("fill", function(d, i){ return color(i);})
	    ;
	  //Create text next to squares
	  legend.selectAll('text')
	    .data(LegendOptions)
	    .enter()
	    .append("text")
	    .attr("x", 650 + 75)
	    .attr("y", function(d, i){ return i * 30 + 19;})
	    .attr("font-size", "16px")
	    .attr("fill", "black")
	    .text(function(d) { return d; })
	    ;


	function position(d) {
	  var v = dragging[d];
	  return v == null ? x(d) : v;
	}

	function transition(g) {
	  return g.transition().duration(500);
	}

	// Returns the path for a given data point.
	function path(d) {
	  return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
	}

	function brushstart() {
	  d3.event.sourceEvent.stopPropagation();
	}

	// Handles a brush event, toggling the display of foreground lines.
	function brush() {
	  var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
	      extents = actives.map(function(p) { return y[p].brush.extent(); });
	  foreground.style("display", function(d) {
	    return actives.every(function(p, i) {
	      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
	    }) ? null : "none";
	  });
	}

}