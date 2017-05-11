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

var player_data = null;

function fetch_all_data() {
    console.log("Fetching all the data from DB")
    for each(var category in db_attributes) {
        $.ajax({
            data : {
                N : 10,
                category: category
            },
            type : 'POST',
            url : 'http://127.0.0.1:5000/getTopNInCategory'
        })
        .done(function(data_from_server) {
            player_data.push(data_from_server.points);
        }
    }
    console.log("Fetching data completed")
}

function get_top_in_category(category) {
    var index = db_attributes.indexOf(category);
    createBarChart(player_data[index], BAR_GRAPH_ID);
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


function draw_parallel_coordinate() {
    if (radar_data != null) {
        radar_chart_helper(radar_data.slice(0, count), radar_legend.slice(0, count), RADAR_CHART_ID);
    } else {
    	$.ajax({
        	data : {
    	        team : "Manchester United"
    	    },
    	    type : 'POST',
    	    url : 'http://127.0.0.1:5000/getTeamAttributes'
    	})
    	.done(function(data_from_server) {       
    	    console.log("Received response for parallel coordinate")
            attributes = data_from_server.Attributes;
    	    createParallelCoordinate(attributes, PARALLEL_COORDINATE_ID);
    	});
    }
}
