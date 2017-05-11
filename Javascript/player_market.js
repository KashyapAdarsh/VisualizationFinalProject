function add_player(chk, player_name, ID) {
	console.log("Player selected : " + player_name);
	if (chk.checked) {
		console.log("checked");
	} else {
		console.log("unchecked")
	}
}

function populate_players() {

	names = ["Stony Brook", "Computer Science", "Visualization", "Adarsh", "Computer Science", "Stony Brook", "Computer Science", "Visualization", "Adarsh", "Computer Science"];

	// Attack
	for (i = 0; i < names.length; i++) {
		labelID = 'la'+i;
		chkID = 'a'+i;
		str = `
			<input type='checkbox' id='`+chkID+`' onclick="add_player(this,document.getElementById('`+labelID+`').textContent,'`+labelID+`')"/>
			<label for = '`+chkID+`' id = '`+labelID+`'><span></span>`+names[i]+`</label>
			<br>
			`;
    	document.getElementById("player_list_attack").innerHTML += str;
	}

	// Defence
	for (i = 0; i < names.length; i++) {
		labelID = 'ld'+i;
		chkID = 'd'+i;
		str = `
			<input type='checkbox' id='`+chkID+`' onclick="add_player(this,document.getElementById('`+labelID+`').textContent,'`+labelID+`')"/>
			<label for = '`+chkID+`' id = '`+labelID+`'><span></span>`+names[i]+`</label>
			<br>
			`;
    	document.getElementById("player_list_defence").innerHTML += str;
	}

	// Build-Up
	for (i = 0; i < names.length; i++) {
		labelID = 'lb'+i;
		chkID = 'b'+i;
		str = `
			<input type='checkbox' id='`+chkID+`' onclick="add_player(this,document.getElementById('`+labelID+`').textContent,'`+labelID+`')"/>
			<label for = '`+chkID+`' id = '`+labelID+`'><span></span>`+names[i]+`</label>
			<br>
			`;
    	document.getElementById("player_list_build").innerHTML += str;
	}

	// Goal
	for (i = 0; i < names.length; i++) {
		labelID = 'lg'+i;
		chkID = 'g'+i;
		str = `
			<input type='checkbox' id='`+chkID+`' onclick="add_player(this,document.getElementById('`+labelID+`').textContent,'`+labelID+`')"/>
			<label for = '`+chkID+`' id = '`+labelID+`'><span></span>`+names[i]+`</label>
			<br>
			`;
    	document.getElementById("player_list_goal").innerHTML += str;
	}

	// Passing
	for (i = 0; i < names.length; i++) {
		labelID = 'lp'+i;
		chkID = 'p'+i;
		str = `
			<input type='checkbox' id='`+chkID+`' onclick="add_player(this,document.getElementById('`+labelID+`').textContent,'`+labelID+`')"/>
			<label for = '`+chkID+`' id = '`+labelID+`'><span></span>`+names[i]+`</label>
			<br>
			`;
    	document.getElementById("player_list_pass").innerHTML += str;
	}
}
