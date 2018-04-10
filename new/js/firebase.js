/*
*
* For firebase functions
*
*/

var currentUser = "";
var currentOrg = "";

$(document).ready(function () {
    // Authenticate user
    $('#login-submit').click(function () {
        var username = $("#uname").val();
        var password = $("#password").val();
        if (username && password) {
            var dbref = firebase.database().ref('/Users/' + username);
            dbref.once('value').then(snap => {
                if (snap.child("password").val() === password) {
                    console.log("Username and password is valid");
                    currentUser = username;
                    currentOrg = snap.child("organization").val();
                    $('#home-title').text(snap.child("name").val() + "'s PlanIt");
                    $('#login').hide();
                    $('#main-app').show();
                }
                else {
                    console.log("Username and password not valid");
                    $('#login-error').text("Invalid username/password. Please try again.");
                }
            });

        }
        else {
            $('#login-error').text("Invalid username/password. Please try again.");
        }
    });

});

