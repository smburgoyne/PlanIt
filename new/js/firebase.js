/*
*
* For firebase functions
*
*/

$(document).ready(function () {
    // Authenticate user
    $('#login-submit').click(function () {
        var username = $("#uname").val();
        var password = $("#password").val();
        if (username && password) {
            var dbref = firebase.database().ref('/Users/' + username + "/password");
            dbref.once('value').then(snap => {
                if (snap.val() == password) {
                    console.log("Username and password is valid");
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

