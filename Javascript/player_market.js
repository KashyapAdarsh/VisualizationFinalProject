var categorical_names = [];
var player_dictionary = {};
var team_attributes = [];
var selected_players = [];
var selected_team;

function get_new_attribute_value(player_attribute, team_attribute) {
    //console.log("RECEIVED PLAYER ATTRIBUTE: ", player_attribute);
    //console.log("RECEIVED TEAM ATTRIBUTE: ", team_attribute);

    if (player_attribute >= team_attribute) {
        player_attribute = team_attribute + (player_attribute / 25);
    }
    else {
        player_attribute = team_attribute - (player_attribute / 25);
    }
    
    if (player_attribute > 100) {
        player_attribute = 100;
    }

    //console.log("RETURNING ATTRIBUTE: ", player_attribute);
    return player_attribute;
}

function get_mapped_team_attributes(team_attributes) {
    //console.log("Team: ", selected_team);
    //console.log("Team Attributes: ", team_attributes);
    
    buildup = (team_attributes[0][BUILD_UP_PLAY_SPEED] + team_attributes[0][BUILD_UP_PLAY_DRIBBLING]) / 2;
    passing = (team_attributes[0][BUILD_UP_PLAY_PASSING] + team_attributes[0][CHANCE_CREATION_PASSING]) / 2;
    attack = (team_attributes[0][CHANCE_CREATION_CROSSING] + team_attributes[0][CHANCE_CREATION_SHOOTING] + team_attributes[0][CHANCE_CREATION_SHOOTING]) / 3;
    defence = (team_attributes[0][DEFENCE_AGGRESSION] + team_attributes[0][DEFENCE_PRESSURE] + team_attributes[0][DEFENCE_TEAM_WIDTH]) / 3;
    gk = (team_attributes[0][DEFENCE_AGGRESSION] + team_attributes[0][DEFENCE_TEAM_WIDTH]) / 2;

    
    mapped_attributes = {
        Name: selected_team,
        BuildUpPlay: buildup,
        Passing: passing,
        Attack: attack, 
        Defence: defence,
        GoalKeeping: gk
    };

    //console.log("Team Mapped Attributes: ", mapped_attributes);
    return mapped_attributes;
}

function modify_team_attributes(player_name, action) {
    all_attributes = [];
    team_attributes_mapped = get_mapped_team_attributes(team_attributes)
    all_attributes.push(team_attributes_mapped);
    add = 1;

    if (action == "checked") {
        for (i = 0; i < selected_players.length; ++i) {
            if (selected_players[i] == player_name) {
                alert("Player " + player_name + " has been picked already.");
                add = 0;
                break;
            }
        }
        if (add == 1) {
            selected_players.push(player_name);
        }
    }
    else if (action == "unchecked") {
        var index = selected_players.indexOf(player_name);
        if (index > -1) {
            selected_players.splice(index, 1);
        }
    }

    var team_buildup, team_passing, team_attack, team_defence, team_gk;
    team_buildup = team_attributes_mapped['BuildUpPlay'];
    team_passing = team_attributes_mapped['Passing'];
    team_attack = team_attributes_mapped['Attack'];
    team_defence = team_attributes_mapped['Defence'];
    team_gk = team_attributes_mapped['GoalKeeping'];

    for(i = 0; i < selected_players.length; ++i) {
        player = player_dictionary[selected_players[i]];

        buildup_play = (player[DRIBBLING] + player[BALL_CONTROL] + player[ACCELERATION] + player[SPRINT_SPEED] + player[AGILITY])/5;
        passing = (player[SHORT_PASSING] + player[LONG_PASSING] + player[BALANCE] + player[VISION])/4;
        attack = (player[CROSSING] + player[FINISHING] + player[HEADING_ACCURACY] + player[VOLLEYS] + player[FREE_KICK_ACCURACY] +                      player[BALANCE] + player[SHOT_POWER] + player[LONG_SHOTS] + player[PENALTIES])/ 9;
        defense = (player[BALANCE] + player[AGGRESSION] + player[INTERCEPTIONS] + player[POSITIONING] + player[MARKING] +                               player[STANDING_TACKLE] + player[SLIDING_TACKLE]) / 7;
        goal_keeping = player[GK_REFLEXES];

        buildup_play = get_new_attribute_value(buildup_play, team_buildup);
        passing = get_new_attribute_value(passing, team_passing);
        attack = get_new_attribute_value(attack, team_attack);
        defense = get_new_attribute_value(defense, team_defence);
        goal_keeping = get_new_attribute_value(goal_keeping, team_gk);

        all_attributes.push({
            Name: selected_players[i],
            BuildUpPlay: buildup_play,
            Passing: passing,
            Attack: attack,
            Defence: defense,
            GoalKeeping: goal_keeping
        });
    }

    //console.log("MODIFIED ATTRIBUTES: ", all_attributes);
    return all_attributes;
}

function create_player_dictionary() {
    //console.log("Create Player Dictionary");
    for (category = 0; category < TOTAL_CATEGORIES; ++category) {
        players = player_data[category][1];
        Object.assign(player_dictionary, players);
    }
}

function fill_category(subcategories, n) {
    var players = Object.keys(player_dictionary);
    var top_players = [];

    for (i = 0; i < players.length; ++i) {
        attributes = player_dictionary[players[i]];
        value = 0;

        for (c = 0; c < subcategories.length; ++c) {
            value += attributes[subcategories[c]];
        }
        
        top_players[i] = [value, players[i]];
    }

    result = [];
    top_players.sort();

    for (i = 0; i <= n; ++i) {
        result[i] = top_players[top_players.length - i - 1][1];
    }
    
    //console.log(result);
    return result;
}

function fill_categories() {
    create_player_dictionary();
    n = 15;
    
    // Build up play category
    var categories = [DRIBBLING, BALL_CONTROL, ACCELERATION, SPRINT_SPEED, AGILITY];
    categorical_names[BUILD_UP_PLAY] = fill_category(categories, n);
    
    // Passing categories
    categories = [SHORT_PASSING, LONG_PASSING, BALANCE, VISION];
    categorical_names[PASSING] = fill_category(categories, n);
    
    // Attack Categories
    categories = [CROSSING, FINISHING, HEADING_ACCURACY, VOLLEYS, FREE_KICK_ACCURACY, BALANCE, SHOT_POWER, LONG_SHOTS, PENALTIES];
    categorical_names[ATTACK] = fill_category(categories, n);
    
    // Defense Categories
    categories = [BALANCE, AGGRESSION, INTERCEPTIONS, POSITIONING, MARKING, STANDING_TACKLE, SLIDING_TACKLE];
    categorical_names[DEFENSE] = fill_category(categories, n);
    
    // Goalkeeping Categories
    categories = [GK_REFLEXES];
    categorical_names[GOAL_KEEPING] = fill_category(categories, n);
}

function add_player(chk, player_name, ID) {
	console.log("Player selected : " + player_name);
	if (chk.checked) {
		console.log("checked");
        data = modify_team_attributes(player_name, "checked");
	} else {
		console.log("unchecked")
        data = modify_team_attributes(player_name, "unchecked");
	}
	d3.select(PARALLEL_COORDINATE_ID).select("svg").remove();
	createParallelCoordinate(data, PARALLEL_COORDINATE_ID);
}

function populate_teams() {
	console.log("In populate team");
	console.log(tree_data.children);

	var input = tree_data.children;
	console.log(input[0])
	for (i = 0; i < input.length; i++) {
		for (j = 0; j < input[i]._children[0]._children.length; j++) {
			document.getElementById("DropDown_1").innerHTML += `<option value="`+input[i]._children[0]._children[j].name+`">`+input[i]._children[0]._children[j].name+`</option>`;
		}
	}
}


function populate_players() {
	// Attack
    fill_categories();

	for (i = 0; i < categorical_names[ATTACK].length; i++) {
		labelID = 'la'+i;
		chkID = 'a'+i;
		str = `
			<input type='checkbox' id='`+chkID+`' onclick="add_player(this,document.getElementById('`+labelID+`').textContent,'`+labelID+`')"/>
			<label for = '`+chkID+`' id = '`+labelID+`'><span></span>`+categorical_names[ATTACK][i]+`</label>
			<br>
			`;
    	document.getElementById("player_list_attack").innerHTML += str;
	}

	// Defence
	for (i = 0; i < categorical_names[DEFENSE].length; i++) {
		labelID = 'ld'+i;
		chkID = 'd'+i;
		str = `
			<input type='checkbox' id='`+chkID+`' onclick="add_player(this,document.getElementById('`+labelID+`').textContent,'`+labelID+`')"/>
			<label for = '`+chkID+`' id = '`+labelID+`'><span></span>`+categorical_names[DEFENSE][i]+`</label>
			<br>
			`;
    	document.getElementById("player_list_defence").innerHTML += str;
	}

	// Build-Up
	for (i = 0; i < categorical_names[BUILD_UP_PLAY].length; i++) {
		labelID = 'lb'+i;
		chkID = 'b'+i;
		str = `
			<input type='checkbox' id='`+chkID+`' onclick="add_player(this,document.getElementById('`+labelID+`').textContent,'`+labelID+`')"/>
			<label for = '`+chkID+`' id = '`+labelID+`'><span></span>`+categorical_names[BUILD_UP_PLAY][i]+`</label>
			<br>
			`;
    	document.getElementById("player_list_build").innerHTML += str;
	}

	// Goal
	for (i = 0; i < categorical_names[GOAL_KEEPING].length; i++) {
		labelID = 'lg'+i;
		chkID = 'g'+i;
		str = `
			<input type='checkbox' id='`+chkID+`' onclick="add_player(this,document.getElementById('`+labelID+`').textContent,'`+labelID+`')"/>
			<label for = '`+chkID+`' id = '`+labelID+`'><span></span>`+categorical_names[GOAL_KEEPING][i]+`</label>
			<br>
			`;
    	document.getElementById("player_list_goal").innerHTML += str;
	}

	// Passing
	for (i = 0; i < categorical_names[PASSING].length; i++) {
		labelID = 'lp'+i;
		chkID = 'p'+i;
		str = `
			<input type='checkbox' id='`+chkID+`' onclick="add_player(this,document.getElementById('`+labelID+`').textContent,'`+labelID+`')"/>
			<label for = '`+chkID+`' id = '`+labelID+`'><span></span>`+categorical_names[PASSING][i]+`</label>
			<br>
			`;
    	document.getElementById("player_list_pass").innerHTML += str;
	}
}