/*
*
* For firebase functions
*
*/

var currentUser = "";
var currentOrg = "SWE";

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
                    $('#all-events-title').text("All of " + snap.child('name').val() + "'s Events");
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

    // populate tables
    var ongoingEventTable = $("#ongoing-events-table");
    var completedEventTable = $("#completed-events-table");
    var dbref = firebase.database().ref('/Organizations/' + currentOrg + "/Events/");
    dbref.on('value', snap => {
        ongoingEventTable.empty();
        completedEventTable.empty();
        var titleRow = $("<tr></tr>");
        var titleRow2 = $("<tr></tr>");
        var name = $("<th></th>").text("Event Name");
        var date = $("<th></th>").text("Date");
        var status = $("<th></th>").text("Status");
        var name2 = $("<th></th>").text("Event Name");
        var date2 = $("<th></th>").text("Date");
        var status2 = $("<th></th>").text("Status");
        titleRow.append(name,date,status);
        titleRow2.append(name2,date2,status2);
        completedEventTable.append(titleRow);
        ongoingEventTable.append(titleRow2);
        snap.forEach(childsnap => {
            var eventRow = $("<tr></tr>");
            var nameColumn = $("<td></td>").text(childsnap.key);
            var dateColumn = $("<td></td>").text(childsnap.child("Date").val());
            var statusColumn = $("<td></td>").text(childsnap.child("Status").val());
            eventRow.append(nameColumn,dateColumn,statusColumn);
            eventRow.css("cursor", "pointer");
            eventRow.addClass("w3-hover-light-blue");

            // // go to event details page
            // eventRow.click(function() {
            //     eventName = nameColumn.text();
            //     $("#detailHeader").text(eventName);
            //     console.log(eventName);
            //     var statusTemp = "";
            //     firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).once('value').then(snap => {
            //         var name = $('#name').val(eventName);
            //         var date = $('#date').val(snap.child("Date").val());
            //         var time = $('#time').val(snap.child("Time").val());
            //         $('#date2').val(snap.child("Date").val());
            //         $('#place2').val(snap.child("Location").val());
            //         $('#about').val(snap.child("Description").val())
            //         $('#time2').val(snap.child("Time").val());
            //         $("#notes").val(snap.child("Notes").val());
            //         var location = $('#place').val(snap.child("Location").val());
            //         $('#planner').val(snap.child("Planner").val());
            //         completion = snap.child("Completion").val()
            //         $('#progressbar > div').css('width', completion +'%');
            //         statusTemp = snap.child("Status").val();
            //         if(statusTemp === "Completed")
            //         {
            //             $('#name').prop('disabled', true);
            //             $('#date').prop('disabled', true);
            //             $('#time').prop('disabled', true);
            //             $('#date2').prop('disabled', true);
            //             $('#place2').prop('disabled', true);
            //             $('#about').prop('disabled', true);
            //             $('#time2').prop('disabled', true);
            //             $('#notes').prop('disabled', true);
            //             $('#planner').prop('disabled', true);
            //             $('#place').prop('disabled', true);

            //             $('#submit1').prop('disabled', true);
            //             $('#cancel1').prop('disabled', true);
            //             $('#submit3').prop('disabled', true);
            //             $('#cancel3').prop('disabled', true);
            //             $('#submit5').prop('disabled', true);
            //             $('#cancel5').prop('disabled', true);
            //             $('#submit').prop('disabled', true);
            //         }
            //         else
            //         {
            //             enableInputs();
            //         }
            //     })
            //     $('#home').hide();
            //     $('#details').show();
            //     $('#upcoming').hide();
            //     $('#past').hide();
            // });

            // add to correct table
            if(statusColumn.text() == "Ongoing") {
                    ongoingEventTable.append(eventRow);
                    console.log("ongoing event");
            }
            else {
                completedEventTable.append(eventRow);
                console.log("past event");
            }
            
        });
    });
});

