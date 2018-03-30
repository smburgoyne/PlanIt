$(document).ready(function() {
	var title = $("#test");
	var dbref = firebase.database().ref().child("title");
	dbref.on('value', snap => title.text(snap.val()));

	
	addEvent("SWE","Banquet","1/26/18","A cool event","Rietz","Ricardo","9:15PM")
});

// Function verfies if username is taken or not. Code must be filled in for error verfication
function verifyUser(username) {
	var dbref = firebase.database().ref('/Users/' + username);
	dbref.once('value').then(snap => {
		if(snap.val() == null) {
			//Username is available do something 
			console.log(username + " is available");
		}
		else {
			//Username is taken do something 
			console.log(username + " is taken");
		}
	});	
}

// Add a user to the database 
function addUser(username, name, password, email, organization, role) {
	firebase.database().ref("/Users/" + username).set({
		"name": name,
		"email": email,
		"password": password,
		"organization": organization
	});

	var JsonObject = {};
	JsonObject[role] = username; 
	firebase.database().ref("/Organizations/" + organization +"/Roles").update(JsonObject);
}

function addEvent(organization,name, date, description,location,planner,time) {
		firebase.database().ref("/Organizations/" + organization + "/Events/" + name).update({
			Date:date,
			Description:description,
			Location:location,
			Planner:planner,
			Time:time
		});
}

function authenticateUser(username, password) {
	var dbref = firebase.database().ref('/Users/' + username + "/password");
	dbref.once('value').then(snap => {
		if(snap.val() == password) {
			//Username and password are valid. do something
			console.log("Username and password is valid");
		}
		else {
			//Username and password is not valid , do something 
			console.log("Username and password not valid");
		}
	});	

}



