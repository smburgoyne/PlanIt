$(document).ready(function() {
	var title = $("#test");
	var dbref = firebase.database().ref().child("title");
	dbref.on('value', snap => title.text(snap.val()));
});