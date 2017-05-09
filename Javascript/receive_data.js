function get_data(input) {
    console.log("In receive data");
    $.ajax({
        data : {
            name : input
        },
        type : 'POST',
        url : 'http://127.0.0.1:5000/getData'
    })
    .done(function(data_from_server) {       
        console.log("Received resposne")
        
        if (input == "collapsible_tree"){
            console.log(data_from_server.DATA);
            draw_tree(data_from_server.DATA);   
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
        createBarChart(drib);
    } else if (category == "crossing" && cross != null) {
        createBarChart(cross);
    } else if (category == "overall_rating" && over_all != null) {
        createBarChart(over_all);
    } else if (category == "short_passing" && short_pass != null) {
        createBarChart(short_pass);
    } else if (category == "volleys" && volley != null) {
        createBarChart(volley);
    } else if (category == "finishing" && finish != null) {
        createBarChart(finish);
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
            
            createBarChart(data_from_server.points);
        });
    }
}