/* This function creates bar chart */   
function createBarChart(data, ID) {
    all_details = data[1]
    data = data[0]

    var sel = document.getElementById("DropDown");
    var category = sel.options[sel.selectedIndex].text;

    d3.select(ID).select("svg").remove();
    d3.select(ID).select("#player_tip").remove();
    var elements = Object.keys(data[0]);

    var xLabels = [];

    for (i = 0; i < data.length; i++) {
        xLabels[i] = data[i].X;
    }
   
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

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) {
      return "<div id = 'player_tip'> <div id = 'player_name'> Adarsh </div></div>";
    })


    var svg = d3.select(ID).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

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
          tip.offset([height - y(d.Y) - 40, 230]);
          document.getElementById("bar_graph").style.opacity = "0.5";
          d3.select(this).attr("opacity", 1);
          tip.show()
          player_bar(all_details, d.X);

          /*d3.select(this).transition()
          .duration(0)
          .attr("width", function(d) { return 50;})
          .attr("x", function(d, i) { return parseInt(d3.select(this).attr("x")) - 5; })
          */
        })
        .on("mouseout", function(d, i) {
          d3.select("#player_tip").remove();
          tip.hide()
          document.getElementById("bar_graph").style.opacity = "1";
          /*d3.select(this).transition()
          .duration(0)
          .attr("width", 40)
          .attr("x", function(d) { return x(i) + 45;; })*/
        });
    
    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "axis_bar")
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
        .attr("class", "axis_bar")
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(category);
}


function player_bar(all_details, player) {

    document.getElementById("player_name").innerHTML = player;

    var data = [{"X":"Overall", "Y":all_details[player][0]},{"X":"Crossing", "Y":all_details[player][1]}, {"X":"Dribbling", "Y":all_details[player][2]},
    {"X":"Finishing", "Y":all_details[player][3]}, {"X":"Short passing", "Y":all_details[player][4]},{"X":"Volleys", "Y":all_details[player][5]}, 
    {"X":"Long passing", "Y":all_details[player][6]},{"X":"Ball control", "Y":all_details[player][7]}, {"X":"Acceleration", "Y":all_details[player][8]},
    {"X":"Sprint speed", "Y":all_details[player][9]}, {"X":"Agility", "Y":all_details[player][10]},{"X":"Balance", "Y":all_details[player][11]},
    {"X":"Shot power", "Y":all_details[player][12]}, {"X":"Stamina", "Y":all_details[player][13]},{"X":"Strength", "Y":all_details[player][14]},
    {"X":"Penalties", "Y":all_details[player][15]},{"X":"Standing tackle", "Y":all_details[player][16]}]

    var attributes = [];

    for (i = 0; i < data.length; i++) {
        attributes[i + 1] = data[i].X;
    }

    var margin = {top: 30, right: 20, bottom: 50, left: 20},
        width = 350 - margin.left - margin.right,
        height = 360 - margin.top - margin.bottom - 30;
    
    padding = 100 / data.length;

    // Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
         
    var xAxis = d3.svg.axis().scale(x).ticks(attributes.length);
    var yAxis = d3.svg.axis().scale(y).orient("left");

    xAxis.tickFormat(function(d, i){
        return attributes[i];
    })
    
    var svg = d3.select("#player_tip").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 50)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, function(d) { return i; }) + 1]);
    y.domain([25, d3.max(data, function(d) { return d.Y; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "player_bar")
        .attr("x", function(d, i) { return x(i) + 10; })
        .attr("width", (width / data.length) - padding)
        .attr("y", function(d) { return y(d.Y) - 10; })
        .attr("height", function(d) { return height - y(d.Y); });
    
    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "axis_player")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".05em")
      .style("font-size", "11px")
      .style("fill", "white")
      .attr("transform", function(d) {
                return "rotate(-70)" 
        });

    // add the y Axis
    svg.append("g")
        .call(yAxis)
        .attr("class", "axis_player")
        .selectAll("text")
        .style("font-size", "10px")
        .style("fill", "white");
}