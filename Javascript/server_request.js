function create_collapsible_tree(input) {
    console.log("In receive data");
    $.ajax({
        data : {
            name : input
        },
        type : 'POST',
        url : 'http://127.0.0.1:5000/getCollapsibleTreeData'
    })
    .done(function(data_from_server) {       
        console.log("Received resposne")
        
        if (input == "collapsible_tree"){
            console.log(data_from_server.DATA);
            drawCollapsibleTree(data_from_server.DATA, COLLAPSIBLE_TREE_ID);
        }
    });
}

var cross = null;
var drib = null;
var over_all = null;
var volley = null;
var short_pass = null;
var finish = null;

function get_top_in_category(category) {
    if (category == "dribbling" && drib != null) {
        createBarChart(drib, BAR_GRAPH_ID);
    } else if (category == "crossing" && cross != null) {
        createBarChart(cross, BAR_GRAPH_ID);
    } else if (category == "overall_rating" && over_all != null) {
        createBarChart(over_all, BAR_GRAPH_ID);
    } else if (category == "short_passing" && short_pass != null) {
        createBarChart(short_pass, BAR_GRAPH_ID);
    } else if (category == "volleys" && volley != null) {
        createBarChart(volley, BAR_GRAPH_ID);
    } else if (category == "finishing" && finish != null) {
        createBarChart(finish, BAR_GRAPH_ID);
    } else {
        console.log("In Get-Top");
        $.ajax({
            data : {
                N : 10,
                category: category
            },
            type : 'POST',
            url : 'http://127.0.0.1:5000/getTopNInCategory'
        })
        .done(function(data_from_server) {
            console.log(data_from_server.points);   
            console.log("Received response")
            
            if (category == "dribbling") {
                drib = data_from_server.points;
            } else if (category == "crossing") {
                cross = data_from_server.points;
            } else if (category == "overall_rating") {
                over_all = data_from_server.points;
            } else if (category == "short_passing") {
                short_pass = data_from_server.points;
            } else if (category == "volleys") {
                volley = data_from_server.points;
            }  else if (category == "finishing") {
               finish = data_from_server.points;
            }
            
            createBarChart(data_from_server.points, BAR_GRAPH_ID);
        });
    }
}


var radar_data = null;
var radar_legend = null;

function draw_radar_chart(count) {
    if (radar_data != null) {
        radar_chart_helper(radar_data.slice(0, count), radar_legend.slice(0, count), RADAR_CHART_ID);
    } else {
    	$.ajax({
        	data : {
    	        name : "Radar"
    	    },
    	    type : 'POST',
    	    url : 'http://127.0.0.1:5000/getRadarData'
    	})
    	.done(function(data_from_server) {       
    	    console.log("Received response")
            radar_data = data_from_server.d;
            radar_legend = data_from_server.LegendOptions;
    	    radar_chart_helper(radar_data.slice(0, count), radar_legend.slice(0, count), RADAR_CHART_ID);
    	});
    }
}
