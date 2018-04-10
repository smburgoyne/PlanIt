/*
*
* For firebase functions
*
*/
$(document).ready(function () {
    // "Global" variables
    var currentUser = "";
    var currentOrg = "SWE";
    var progress = 0;
    var completion = 0;
    resetNewEventPage();
    
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
    var upcomingEventTable = $('#upcoming-events-table');
    var dbref = firebase.database().ref('/Organizations/' + currentOrg + "/Events/");
    dbref.on('value', snap => {
        ongoingEventTable.empty();
        completedEventTable.empty();
        upcomingEventTable.empty();
        var titleRow = $("<tr></tr>");
        var titleRow2 = $("<tr></tr>");
        var titleRow3 = $("<tr></tr>");
        var name = $("<th></th>").text("Event Name");
        var date = $("<th></th>").text("Date");
        var status = $("<th></th>").text("Status");
        var name2 = $("<th></th>").text("Event Name");
        var date2 = $("<th></th>").text("Date");
        var status2 = $("<th></th>").text("Status");
        var name3 = $("<th></th>").text("Event Name");
        var date3 = $("<th></th>").text("Date");
        var status3 = $("<th></th>").text("Status");
        titleRow.append(name,date,status);
        titleRow2.append(name2,date2,status2);
        titleRow3.append(name3,date3,status3);
        completedEventTable.append(titleRow);
        ongoingEventTable.append(titleRow2);
        upcomingEventTable.append(titleRow3);
        snap.forEach(childsnap => {
            var eventRow = $("<tr></tr>");
            var nameColumn = $("<td></td>").text(childsnap.key);
            var dateColumn = $("<td></td>").text(childsnap.child("Date").val());
            var statusColumn = $("<td></td>").text(childsnap.child("Status").val());
            var eventRow1 = $("<tr></tr>");
            var nameColumn1 = $("<td></td>").text(childsnap.key);
            var dateColumn1 = $("<td></td>").text(childsnap.child("Date").val());
            var statusColumn1 = $("<td></td>").text(childsnap.child("Status").val());
            eventRow.append(nameColumn,dateColumn,statusColumn);
            eventRow.css("cursor", "pointer");
            eventRow.addClass("w3-hover-light-blue");
            eventRow1.append(nameColumn1,dateColumn1,statusColumn1);
            eventRow1.css("cursor", "pointer");
            eventRow1.addClass("w3-hover-light-blue");

            // go to event details page
            eventRow.click(function() {
                eventName = nameColumn.text();
                $("#detailHeader").text(eventName);
                console.log(eventName);
                $('#detail-title').text(eventName + ' Details');
                var statusTemp = "";
                firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).once('value').then(snap => {
                    var name = $('#name').val(eventName);
                    var date = $('#date').val(snap.child("Date").val());
                    var time = $('#time').val(snap.child("Time").val());
                    $('#date2').val(snap.child("Date").val());
                    $('#place2').val(snap.child("Location").val());
                    $('#about').val(snap.child("Description").val())
                    $('#time2').val(snap.child("Time").val());
                    $("#notes").val(snap.child("Notes").val());
                    var location = $('#place').val(snap.child("Location").val());
                    $('#planner').val(snap.child("Planner").val());
                    completion = snap.child("Completion").val()
                    $('#progressbar > div').css('width', completion +'%');
                    statusTemp = snap.child("Status").val();
                    if(statusTemp === "Completed")
                    {
                        disableAllInputs();
                    }
                    else
                    {
                        enableAllInputs();
                    }
                })
                $('#home').hide();
                $('#event-details').show();
                $('#all-events').hide();
            });
            eventRow1.click(function() {
                eventName = nameColumn.text();
                $("#detailHeader").text(eventName);
                console.log(eventName);
                $('#detail-title').text(eventName + ' Details');
                var statusTemp = "";
                firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).once('value').then(snap => {
                    var name = $('#name').val(eventName);
                    var date = $('#date').val(snap.child("Date").val());
                    var time = $('#time').val(snap.child("Time").val());
                    $('#date2').val(snap.child("Date").val());
                    $('#place2').val(snap.child("Location").val());
                    $('#about').val(snap.child("Description").val())
                    $('#time2').val(snap.child("Time").val());
                    $("#notes").val(snap.child("Notes").val());
                    var location = $('#place').val(snap.child("Location").val());
                    $('#planner').val(snap.child("Planner").val());
                    completion = snap.child("Completion").val()
                    $('#progressbar > div').css('width', completion +'%');
                    statusTemp = snap.child("Status").val();
                    if(statusTemp === "Completed")
                    {
                        disableAllInputs();
                    }
                    else
                    {
                        enableAllInputs();
                    }
                })
                $('#home').hide();
                $('#event-details').show();
                $('#all-events').hide();
            });

            // add to correct table on all events page
            if(statusColumn.text() == "Ongoing") {
                ongoingEventTable.append(eventRow);
            }
            else {
                completedEventTable.append(eventRow);
            }

            // add to upcoming table if within next 2 weeks
            var tempDate = new Date(Date.parse(childsnap.child("Date").val()));
            var timeDiff = (tempDate.getTime() - Date.now()) / 604800000;
            console.log(timeDiff);
            if(timeDiff < 2 && timeDiff >= 0)
            {
                upcomingEventTable.append(eventRow1);
            }
        });
    });
});

// Enable all new event inputs
function enableAllInputs()
{
    $('#name').prop('disabled', false);
    $('#date').prop('disabled', false);
    $('#time').prop('disabled', false);
    $('#place').prop('disabled', false);
    $('#about').prop('disabled', false);
    $('#planner').prop('disabled', false);
    $('#submit1').prop('disabled', false);
    $('#cancel1').prop('disabled', false);

    // enable finance buttons

    $('#date2').prop('disabled', false);
    $('#place2').prop('disabled', false);
    $('#time2').prop('disabled', false);
    // enable other logistics buttons
    $('#submit3').prop('disabled', false);
    $('#cancel3').prop('disabled', false);

    // enable marketing buttons

    $('#notes').prop('disabled', false);
    $('#submit5').prop('disabled', false);
    $('#cancel5').prop('disabled', false);
    
    $('#submit').prop('disabled', false);
}

// Reset inputs for new event page
function resetNewEventPage()
{
    var name = $('#name').val("");
    var date = $('#date').val("");
    var time = $('#time').val("");
    $('#date2').val("");
    $('#place2').val("");
    $('#about').val("")
    $('#time2').val("");
    $("#notes").val("");
    var location = $('#place').val("");
    $('#planner').val("");
    $('#progressbar > div').css('width', '0%');
    completion = 0;

    $('#detail-title').text("Create New Event");

    $('#name').prop('disabled', false);
    $('#date').prop('disabled', false);
    $('#time').prop('disabled', false);
    $('#place').prop('disabled', false);
    $('#about').prop('disabled', false);
    $('#planner').prop('disabled', false);
    $('#submit1').prop('disabled', false);
    $('#cancel1').prop('disabled', false);

    // disable finance buttons

    $('#date2').prop('disabled', true);
    $('#place2').prop('disabled', true);
    $('#time2').prop('disabled', true);
    // disable other logistics buttons
    $('#submit3').prop('disabled', true);
    $('#cancel3').prop('disabled', true);

    // disable marketing buttons

    $('#notes').prop('disabled', true);
    $('#submit5').prop('disabled', true);
    $('#cancel5').prop('disabled', true);

    $('#submit').prop('disabled', true);
}

// Disable all new event inputs
function disableAllInputs() 
{
    $('#name').prop('disabled', true);
    $('#date').prop('disabled', true);
    $('#time').prop('disabled', true);
    $('#place').prop('disabled', true);
    $('#about').prop('disabled', true);
    $('#planner').prop('disabled', true);
    $('#submit1').prop('disabled', true);
    $('#cancel1').prop('disabled', true);

    // disable finance buttons

    $('#date2').prop('disabled', true);
    $('#place2').prop('disabled', true);
    $('#time2').prop('disabled', true);
    // disable other logistics buttons
    $('#submit3').prop('disabled', true);
    $('#cancel3').prop('disabled', true);

    // disable marketing buttons

    $('#notes').prop('disabled', true);
    $('#submit5').prop('disabled', true);
    $('#cancel5').prop('disabled', true);

    $('#submit').prop('disabled', true);
}

