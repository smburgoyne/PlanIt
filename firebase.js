$(document).ready(function() {
	var title = $("#test");
	var dbref = firebase.database().ref().child("title");
	dbref.on('value', snap => title.text(snap.val()));

	verifyUser("Jbizzle");
	verifyUser("jbizzle");
	verifyUser("LALA");
	addUser("2Hype!","Jimmy","secret123","2hype@gmail.com","SWE","Webmaster");
	authenticateUser("2Hype!","secret123");
	authenticateUser("Ricardo","secret123");
	authenticateUser("2Hype!","secret321");
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



