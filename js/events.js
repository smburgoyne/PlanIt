/*
*
* For event-related functions
*
*/

// "Global" variables
var currentUser = "";
var currentOrg = "SWE";
var progress = 0;
var completion = 0;
var currentLocation = "";
var currentIsFree = "";
var currentAdStatus = "";
var currentBudgetStatus = "";
var eventName = "";
var isNewEvent = true;

$(document).ready(function () {
    resetNewEventPage();

    // Authenticate user
    $('#login-submit').click(function () {
        var username = $("#uname").val();
        var password = $("#password").val();
        if (username && password) {
            var dbref = firebase.database().ref('/Users/' + username);
            dbref.once('value').then(snap => {
                if (snap.child("password").val() === password) {
                    // console.log("Username and password is valid");
                    currentUser = username;
                    currentOrg = snap.child("organization").val();
                    $('#home-title').text(snap.child("name").val() + "'s PlanIt");
                    $('#all-events-title').text("All of " + snap.child('name').val() + "'s Events");
                    $('#login').hide();
                    $('#main-app').show();
                }
                else {
                    // console.log("Username and password not valid");
                    $('#login-error').text("Invalid username/password. Please try again.");
                }
            });

        }
        else {
            $('#login-error').text("Invalid username/password. Please try again.");
        }
    });

    // navigate the app
    $("#home-tab-button").click(function () {
        $('#home').show();
        $('#event-details').hide();
        $('#all-events').hide();
    });

    $("#new-tab-button").click(function () {
        resetNewEventPage();

        $('#home').hide();
        $('#event-details').show();
        $('#all-events').hide();
    });

    $("#all-tab-button").click(function () {
        $('#home').hide();
        $('#event-details').hide();
        $('#all-events').show();
    });

    $('#new-event-button').click(function() {
        resetNewEventPage();

        $('#home').hide();
        $('#event-details').show();
        $('#all-events').hide();
    });

    $("#all-events-button").click(function () {
        $('#home').hide();
        $('#event-details').hide();
        $('#all-events').show();
    }); 

    $('#logout').click(function() {
        // reset pages
        $('#home').show();
        $('#event-details').hide();
        $('#all-events').hide();
        resetNewEventPage();

        $('#uname').val("");
        $('#password').val("");
        $('#login-error').text("");

        $('#login').show();
        $('#main-app').hide();
    });

    // populate tables
    var ongoingEventTable = $("#ongoing-events-table");
    var completedEventTable = $("#completed-events-table");
    var upcomingEventTable = $('#upcoming-events-table');
    var dbref = firebase.database().ref('/Organizations/' + currentOrg + "/Events/");
    dbref.on('value', snap => {
        var upcomingCount = 0;
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
        titleRow.append(name, date, status);
        titleRow2.append(name2, date2, status2);
        titleRow3.append(name3, date3, status3);
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
            eventRow.append(nameColumn, dateColumn, statusColumn);
            eventRow.css("cursor", "pointer");
            eventRow.addClass("w3-hover-light-blue");
            eventRow1.append(nameColumn1, dateColumn1, statusColumn1);
            eventRow1.css("cursor", "pointer");
            eventRow1.addClass("w3-hover-light-blue");

            // go to event details page
            eventRow.click(function () {
                enableAllInputs();
                eventName = nameColumn.text();
                $('#detail-title').text(eventName + ' Details');
                var statusTemp = "";
                firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).once('value').then(snap => {
                    var name = $('#name').val(eventName);
                    var date = $('#date').val(snap.child("Date").val());
                    var time = $('#time').val(snap.child("Time").val());
                    currentLocation = snap.child("Location").val();
                    if(currentLocation === "On")
                    {
                        $('#location-details').show();
                        $('#location-details1').show();
                        $('#location-type').text("On-Campus");
                        $('#location-details2').show();
                        $('#location-details3').show();
                        $('#location-type1').text("On-Campus");
                        currentLocation = "On";
                    }
                    else if(currentLocation === "Off")
                    {
                        $('#location-details').hide();
                        $('#location-details1').show();
                        $('#location-type').text("Off-Campus");
                        $('#location-details2').hide();
                        $('#location-details3').show();
                        $('#location-type1').text("Off-Campus");
                        currentLocation = "Off";
                    }
                    else if(currentLocation === "Tbd")
                    {
                        $('#location-details').hide();
                        $('#location-details1').hide();
                        $('#location-type').text("TBD");
                        $('#location-details2').hide();
                        $('#location-details3').hide();
                        $('#location-type1').text("TBD");
                        currentLocation = "Tbd";
                    }
                    $('#place').val(snap.child("Address").val());
                    $('#about').val(snap.child("Description").val());
                    $('#planner').val(snap.child("Planner").val());

                    if((currentLocation === "On" || currentLocation === "Off") && $('#about').val() && $('#planner').val())
                    {
                        $('#pi1').text('done');
                    }
                    else
                    {
                        $('#pi1').text('query_builder');
                    }

                    currentIsFree = snap.child("IsFree").val();
                    currentBudgetStatus = snap.child("BudgetStatus").val();
                    if(currentBudgetStatus != "")
                    {
                        $('#request-budget-button-text').text("Budget Request Sent");
                        $('#request-budget-button').prop("disabled", "true");
                        if(currentBudgetStatus === "Pending")
                        {
                            $('#request-budget-response-icon').text("query_builder");
                            $('#request-budget-response').text("Your budget is pending approval from the Treasurer.");
                        }
                        else if (currentBudgetStatus === "Approved")
                        {
                            $('#request-budget-response-icon').text("done");
                            $('#request-budget-response').text("Your budget of $50 has been approved!");
                        }
                    }
                    if(currentIsFree === "Yes")
                    {
                        $('#paid-event-details').hide();
                        $('#budget-type').text("Yes");
                        currentIsFree = "Yes";
                        $('#pi2').text("done");
                    }
                    else if (currentIsFree === "No")
                    {
                        $('#paid-event-details').show();
                        $('#budget-type').text("No");
                        currentIsFree = "No";
                        $('#list-link').val(snap.child("ListLink").val());
                        if(currentBudgetStatus === "Approved" && $('#list-link').val())
                        {
                            $('#pi2').text('done');
                        }
                        else
                        {
                            $('#pi2').text('query_builder');
                        }
                    }
                    else
                    {
                        $('#paid-event-details').hide();
                        $('#budget-type').text("Choose an option");
                        $('#pi2').text('clear');
                    }
                    $('#list-link').val(snap.child("ListLink").val());

                    $('#date2').val(snap.child("Date").val());
                    $('#place2').val(snap.child("Address").val());
                    $('#time2').val(snap.child("Time").val());
                    $('#list-link2').val(snap.child("ListLink").val());
                    $('#signin-link').val(snap.child("SigninLink").val());
                    $('#volunteer-link').val(snap.child("VolLink").val());
                    $('#carpool-link').val(snap.child("CarpoolLink").val());
                    if($('#signin-link').val() && $('#volunteer-link').val() && $('#carpool-link').val())
                    {
                        $('#pi3').text('done');
                    }
                    else
                    {
                        $('#pi3').text('query_builder');
                    }

                    currentAdStatus = snap.child("AdStatus").val();
                    if(currentAdStatus == "")
                    {
                        $('#pi4').text('clear');
                        $('#request-ad-button-text').text("Request Advertising");
                        $('#request-ad-response-icon').text("");
                        $('#request-ad-response').text("");
                        // $('#request-ad-button').prop("disabled", "false");
                    }
                    else if (currentAdStatus == "Pending")
                    {
                        $('#pi4').text('query_builder');
                        $('#request-ad-button-text').text("Advertising Request Sent");
                        $('#request-ad-response-icon').text("query_builder");
                        $('#request-ad-response').text("Your request for advertising has been sent to your Marketing Chair.");
                        $('#request-ad-button').prop("disabled", "true");
                    }
                    else if(currentAdStatus == "Approved")
                    {
                        $('#pi4').text('done');
                        $('#request-ad-button-text').text("Advertising Request Sent");
                        $('#request-ad-response-icon').text("done");
                        $('#request-ad-response').text("The Marketing Chair is advertising your event!");
                        $('#request-ad-button').prop("disabled", "true");
                    }

                    $("#notes").val(snap.child("Notes").val());
                    if($('#notes').val())
                    {
                        $('#pi5').text('done');
                    }
                    else
                    {
                        $('#pi5').text('clear');
                    }

                    completion = snap.child("Completion").val()
                    $('#progressbar > div').css('width', completion + '%');
                    statusTemp = snap.child("Status").val();
                    if (statusTemp === "Completed") {
                        disableAllInputs();
                        $('#pi1').text('done');
                        $('#pi2').text('done');
                        $('#pi3').text('done');
                        $('#pi4').text('done');
                        $('#pi5').text('done');
                    }
                })
                $('#home').hide();
                $('#event-details').show();
                $('#all-events').hide();
                isNewEvent = false;
            });
            eventRow1.click(function () {
                enableAllInputs();
                eventName = nameColumn.text();
                $('#detail-title').text(eventName + ' Details');
                var statusTemp = "";
                firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).once('value').then(snap => {
                    var name = $('#name').val(eventName);
                    var date = $('#date').val(snap.child("Date").val());
                    var time = $('#time').val(snap.child("Time").val());
                    currentLocation = snap.child("Location").val();
                    if(currentLocation === "On")
                    {
                        $('#location-details').show();
                        $('#location-details1').show();
                        $('#location-type').text("On-Campus");
                        $('#location-details2').show();
                        $('#location-details3').show();
                        $('#location-type1').text("On-Campus");
                        currentLocation = "On";
                    }
                    else if(currentLocation === "Off")
                    {
                        $('#location-details').hide();
                        $('#location-details1').show();
                        $('#location-type').text("Off-Campus");
                        $('#location-details2').hide();
                        $('#location-details3').show();
                        $('#location-type1').text("Off-Campus");
                        currentLocation = "Off";
                    }
                    else if(currentLocation === "Tbd")
                    {
                        $('#location-details').hide();
                        $('#location-details1').hide();
                        $('#location-type').text("TBD");
                        $('#location-details2').hide();
                        $('#location-details3').hide();
                        $('#location-type1').text("TBD");
                        currentLocation = "Tbd";
                    }
                    $('#place').val(snap.child("Address").val());
                    $('#about').val(snap.child("Description").val());
                    $('#planner').val(snap.child("Planner").val());

                    if((currentLocation === "On" || currentLocation === "Off") && $('#about').val() && $('#planner').val())
                    {
                        $('#pi1').text('done');
                    }
                    else
                    {
                        $('#pi1').text('query_builder');
                    }

                    currentIsFree = snap.child("IsFree").val();
                    currentBudgetStatus = snap.child("BudgetStatus").val();
                    if(currentBudgetStatus != "")
                    {
                        $('#request-budget-button-text').text("Budget Request Sent");
                        $('#request-budget-button').prop("disabled", "true");
                        if(currentBudgetStatus === "Pending")
                        {
                            $('#request-budget-response-icon').text("query_builder");
                            $('#request-budget-response').text("Your budget is pending approval from the Treasurer.");
                        }
                        else if (currentBudgetStatus === "Approved")
                        {
                            $('#request-budget-response-icon').text("done");
                            $('#request-budget-response').text("Your budget of $50 has been approved!");
                        }
                    }
                    if(currentIsFree === "Yes")
                    {
                        $('#paid-event-details').hide();
                        $('#budget-type').text("Yes");
                        currentIsFree = "Yes";
                        $('#pi2').text("done");
                    }
                    else if (currentIsFree === "No")
                    {
                        $('#paid-event-details').show();
                        $('#budget-type').text("No");
                        currentIsFree = "No";
                        $('#list-link').val(snap.child("ListLink").val());
                        if(currentBudgetStatus === "Approved" && $('#list-link').val())
                        {
                            $('#pi2').text('done');
                        }
                        else
                        {
                            $('#pi2').text('query_builder');
                        }
                    }
                    else
                    {
                        $('#paid-event-details').hide();
                        $('#budget-type').text("Choose an option");
                        $('#pi2').text('clear');
                    }
                    $('#list-link').val(snap.child("ListLink").val());

                    $('#date2').val(snap.child("Date").val());
                    $('#place2').val(snap.child("Address").val());
                    $('#time2').val(snap.child("Time").val());
                    $('#list-link2').val(snap.child("ListLink").val());
                    $('#signin-link').val(snap.child("SigninLink").val());
                    $('#volunteer-link').val(snap.child("VolLink").val());
                    $('#carpool-link').val(snap.child("CarpoolLink").val());
                    if($('#signin-link').val() && $('#volunteer-link').val() && $('#carpool-link').val())
                    {
                        $('#pi3').text('done');
                    }
                    else
                    {
                        $('#pi3').text('query_builder');
                    }

                    currentAdStatus = snap.child("AdStatus").val();
                    if(currentAdStatus == "")
                    {
                        $('#pi4').text('clear');
                        $('#request-ad-button-text').text("Request Advertising");
                        $('#request-ad-response-icon').text("");
                        $('#request-ad-response').text("");
                        // $('#request-ad-button').prop("disabled", "false");
                    }
                    else if (currentAdStatus == "Pending")
                    {
                        $('#pi4').text('query_builder');
                        $('#request-ad-button-text').text("Advertising Request Sent");
                        $('#request-ad-response-icon').text("query_builder");
                        $('#request-ad-response').text("Your request for advertising has been sent to the Marketing Chair.");
                        $('#request-ad-button').prop("disabled", "true");
                    }
                    else if(currentAdStatus == "Approved")
                    {
                        $('#pi4').text('done');
                        $('#request-ad-button-text').text("Advertising Request Sent");
                        $('#request-ad-response-icon').text("done");
                        $('#request-ad-response').text("The Marketing chair is advertising your event!");
                        $('#request-ad-button').prop("disabled", "true");
                    }

                    $("#notes").val(snap.child("Notes").val());
                    if($('#notes').val())
                    {
                        $('#pi5').text('done');
                    }
                    else
                    {
                        $('#pi5').text('clear');
                    }

                    completion = snap.child("Completion").val()
                    $('#progressbar > div').css('width', completion + '%');
                    statusTemp = snap.child("Status").val();
                    if (statusTemp === "Completed") {
                        disableAllInputs();
                        $('#pi1').text('done');
                        $('#pi2').text('done');
                        $('#pi3').text('done');
                        $('#pi4').text('done');
                        $('#pi5').text('done');
                    }
                })
                $('#home').hide();
                $('#event-details').show();
                $('#all-events').hide();
                isNewEvent = false;
            });

            // add to correct table on all events page
            if (statusColumn.text() == "Ongoing") {
                ongoingEventTable.append(eventRow);
            }
            else {
                completedEventTable.append(eventRow);
            }

            // add to upcoming table if within next 2 weeks
            var tempDate = new Date(Date.parse(childsnap.child("Date").val()));
            var timeDiff = (tempDate.getTime() - Date.now()) / 604800000;
            // console.log(timeDiff);
            if (timeDiff < 2 && timeDiff >= 0 && statusColumn1.text() == "Ongoing") {
                upcomingEventTable.append(eventRow1);
                upcomingCount += 1;
            }
        });

        if(upcomingCount == 0)
        {
            upcomingEventTable.empty();
            $('#upcoming-tip').text("You have no events in the next two weeks, but make sure to check your notifications and ongoing events!");
        }
    });

    // Form inputs
    $('#on-campus').click(function () {
        $('#location-details').show();
        $('#location-details1').show();
        $('#location-type').text("On-Campus");
        $('#location-details2').show();
        $('#location-details3').show();
        $('#location-type1').text("On-Campus");
        currentLocation = "On";
    });

    $('#off-campus').click(function () {
        $('#location-details').hide();
        $('#location-details1').show();
        $('#location-type').text("Off-Campus");
        $('#location-details2').hide();
        $('#location-details3').show();
        $('#location-type1').text("Off-Campus");
        currentLocation = "Off";
    });

    $('#tbd').click(function () {
        $('#location-details').hide();
        $('#location-details1').hide();
        $('#location-type').text("TBD");
        $('#location-details2').hide();
        $('#location-details3').hide();
        $('#location-type1').text("TBD");
        currentLocation = "Tbd";
    });

    $('#on-campus1').click(function () {
        $('#location-details').show();
        $('#location-details1').show();
        $('#location-type').text("On-Campus");
        $('#location-details2').show();
        $('#location-details3').show();
        $('#location-type1').text("On-Campus");
        currentLocation = "On";
    });

    $('#off-campus1').click(function () {
        $('#location-details').hide();
        $('#location-details1').show();
        $('#location-type').text("Off-Campus");
        $('#location-details2').hide();
        $('#location-details3').show();
        $('#location-type1').text("Off-Campus");
        currentLocation = "Off";
    });

    $('#tbd1').click(function () {
        $('#location-details').hide();
        $('#location-details1').hide();
        $('#location-type').text("TBD");
        $('#location-details2').hide();
        $('#location-details3').hide();
        $('#location-type1').text("TBD");
        currentLocation = "Tbd";
    });

    $('#free-event').click(function () {
        $('#paid-event-details').hide();
        $('#budget-type').text("Yes");
        currentIsFree = "Yes";
    })

    $('#paid-event').click(function () {
        $('#paid-event-details').show();
        $('#budget-type').text("No");
        currentIsFree = "No";
    })

    // Form Buttons
    $('#submit1').click(function () {
        // Add or update event
        var name = $('#name').val();
        var date = $('#date').val();
        var time = $('#time').val();

        if (name === "" || date === "" || time === "" || currentLocation === "") {
            $('#event-error').text("Please fill in the required information.");
        }
        else {
            if (completion < 15) {
                if(currentLocation === "Tbd")
                {
                    completion += 15
                }
                else
                {
                    completion += 20;
                }
                $('#progressbar > div').css('width', completion + '%');
            }
            if(completion)
            $('#event-error').text("");
            if(isNewEvent)
            {
                firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + $('#name').val()).update({
                    AdStatus: currentAdStatus,
                    Address: $('#place').val(),
                    BudgetStatus: currentBudgetStatus,
                    CarpoolLink: "",
                    Date: $('#date').val(),
                    Description: $('#about').val(),
                    IsFree: currentIsFree,
                    ListLink: "",
                    Location: currentLocation,
                    Notes: "",
                    Planner: $('#planner').val(),
                    SigninLink: "",
                    Time: $('#time').val(),
                    Status: "Ongoing",
                    Completion: completion,
                    VolLink: "",
                    Created: Date.now()
                });

                if((currentLocation === "On" || currentLocation === "Off") && $('#about').val() && $('#planner').val())
                {
                    $('#pi1').text('done');
                }
                else
                {
                    $('#pi1').text('query_builder');
                }

                $('#pi2').text('clear');
                $('#pi3').text('query_builder');
                $('#pi4').text('clear');
                $('#pi5').text('clear');
            }
            else
            {
                firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + $('#name').val()).update({
                    Address: $('#place').val(),
                    Date: $('#date').val(),
                    Description: $('#about').val(),
                    Location: currentLocation,
                    Planner: $('#planner').val(),
                    Time: $('#time').val(),
                    Completion: completion
                });

                if((currentLocation === "On" || currentLocation === "Off") && $('#about').val() && $('#planner').val())
                {
                    $('#pi1').text('done');
                }
            }
            eventName = $('#name').val();
            $('#date2').val($('#date').val());
            $('#place2').val($('#place').val());
            $('#time2').val($('#time').val());
            enableAllInputs();
        }
    });

    $('#request-budget-button').click(function() {
        // send request
        if(completion < 50)
        {
            completion += 15;
            $('#progressbar > div').css('width', completion + '%');
        }

        if(currentBudgetStatus !== "Approved")
        {
            currentBudgetStatus = "Pending";
            $('#request-budget-button-text').text("Budget Request Sent");
            $('#request-budget-response-icon').text("query_builder");
            $('#request-budget-response').text("Your budget is pending approval from the Treasurer.");
            $('#request-budget-button').prop("disabled", "true");
        }

        firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
            BudgetStatus: currentBudgetStatus,
            Completion: completion
        });
    })

    $('#submit2').click(function() {
        // Update event
        if(currentIsFree === "")
        {
            $('#event-error1').text("Please fill in the required information.");
        }
        else
        {
            if(completion < 50)
            {
                if(currentIsFree === "Yes")
                {
                    completion += 30;
                }
                else
                {
                    completion += 15;
                }
                $('#progressbar > div').css('width', completion + '%');
            }

            firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
                IsFree: currentIsFree,
                BudgetStatus: currentBudgetStatus,
                ListLink: $('#list-link').val(),
                Completion: completion
            });
            
            $('#list-link2').val($('#list-link').val());

            if(currentIsFree === "Yes")
            {
                $('#pi2').text('done');
            }
            else
            {
                if(completion >= 45)
                {
                    $('#pi2').text('done');
                }
                else
                {
                    $('#pi2').text('query_builder');
                }
            }
        }
    });

    $('#submit3').click(function() {
        var date2 = $('#date2').val();
        var time2 = $('#time2').val();
        if (date2 === "" || time2 === "")
        {
            $('#event-error2').text("Please fill in the required information.");
        }
        else
        {
            if(completion < 65)
            {
                if($('#signin-link').val())
                {
                    completion += 5;
                }
                if($('#volunteer-link').val())
                {
                    completion += 5;
                }
                if($('#carpool-link').val())
                {
                    completion += 5;
                }
                $('#progressbar > div').css('width', completion + '%');
            }

            firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
                Date: $('#date2').val(),
                Time: $('#time2').val(),
                Location: currentLocation,
                Address: $('#place2').val(),
                ListLink: $('#list-link2').val(),
                SigninLink: $('#signin-link').val(),
                VolLink: $('#volunteer-link').val(),
                CarpoolLink: $('#carpool-link').val(),
                Completion: completion
            });

            $('#date').val($('#date2').val());
            $('#time').val($('#time2').val());
            $('#place').val($('#place2').val());
            $('#list-link').val($('#list-link2').val());

            if($('#signin-link').val() && $('#volunteer-link').val() && $('#carpool-link').val())
            {
                $('#pi3').text('done');
            }
        }
    });

    $('#request-ad-button').click(function() {
        if(completion < 75)
        {
            completion += 10;
            $('#progressbar > div').css('width', completion + '%');
        }

        if(currentAdStatus !== "Approved")
        {
            currentAdStatus = "Pending";
            $('#request-ad-button-text').text("Advertising Request Sent");
            $('#request-ad-response-icon').text("query_builder");
            $('#request-ad-response').text("Your request for advertising has been sent to the Marketing Chair.");
            $('#request-ad-button').prop("disabled", "true");
        }

        firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
            Completion: completion,
            AdStatus: currentAdStatus
        });
    });

    $('#submit4').click(function() {
        firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
            Completion: completion,
            AdStatus: currentAdStatus
        });

        if(currentAdStatus === "Approved")
        {
            $('#pi4').text('done');
        }
        else if(currentAdStatus === "Pending")
        {
            $('#pi4').text('query_builder');
        }
    });

    $('#feedback-form-button').click(function () {
        var tempDate = new Date(Date.parse($('#date').val()));
        var timeDiff = (tempDate.getTime() - Date.now()) / 604800000;
        if (timeDiff < 0) {
            completion = 95;
            $('#progressbar > div').css('width', completion + '%');
        }

        firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
            Completion: completion
        });
    });

    $('#submit5').click(function() {
        firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
            Notes: $('#notes').val()
        });

        $('#pi5').text('done');
    });

    $('#submit').click(function() {
        completion = 100;
        $('#progressbar > div').css('width', completion + '%');
        firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
            Status:'Completed',
            Completion: completion
        });

        $('#pi1').text('done');
        $('#pi2').text('done');
        $('#pi3').text('done');
        $('#pi4').text('done');
        $('#pi5').text('done');

        disableAllInputs();
    });
});

// Enable all new event inputs
function enableAllInputs() {
    $('#name').prop('disabled', false);
    $('#date').prop('disabled', false);
    $('#time').prop('disabled', false);
    $('#location-dropdown-button').prop('disabled', false);
    $('#place').prop('disabled', false);
    $('#about').prop('disabled', false);
    $('#planner').prop('disabled', false);
    $('#submit1').prop('disabled', false);
    $('#cancel1').prop('disabled', false);

    $('#budget-dropdown-button').prop('disabled', false);
    $('#request-budget-button').prop('disabled', false);
    $('#supplies-list-button').prop('disabled', false);
    $('#list-link').prop('disabled', false);
    $('#request-reimbursement-button').prop('disabled', false);
    $('#submit2').prop('disabled', false);
    $('#cancel2').prop('disabled', false);

    $('#date2').prop('disabled', false);
    $('#location-dropdown-button1').prop('disabled', false);
    $('#place2').prop('disabled', false);
    $('#time2').prop('disabled', false);
    $('#supplies-list-button1').prop('disabled', false);
    $('#list-link2').prop('disabled', false);
    $('#signin-form-button').prop('disabled', false);
    $('#signin-link').prop('disabled', false);
    $('#volunteer-form-button').prop('disabled', false);
    $('#volunteer-link').prop('disabled', false);
    $('#carpool-form-button').prop('disabled', false);
    $('#carpool-link').prop('disabled', false);
    $('#submit3').prop('disabled', false);
    $('#cancel3').prop('disabled', false);

    $('#request-ad-button').prop('disabled', false);
    $('#submit4').prop('disabled', false);
    $('#cancel4').prop('disabled', false);

    $('#feedback-form-button').prop('disabled', false);
    $('#notes').prop('disabled', false);
    $('#submit5').prop('disabled', false);
    $('#cancel5').prop('disabled', false);

    $('#submit').prop('disabled', false);
}

// Reset inputs for new event page
function resetNewEventPage() {
    $('#pi1').text("");
    $('#pi2').text("");
    $('#pi3').text("");
    $('#pi4').text("");
    $('#pi5').text("");

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
    $('#list-link').val("");
    $('#list-link2').val("");
    $('#signin-link').val("");
    $('#volunteer-link').val("");
    $('#carpool-link').val("");

    currentLocation = "";
    currentIsFree = "";
    currentAdStatus = "";
    currentBudgetStatus = "";
    isNewEvent = true;

    $('#request-budget-button-text').text("Request Budget");
    $('#request-budget-response-icon').text("");
    $('#request-budget-response').text("");

    $('#request-ad-button-text').text("Request Advertising");
    $('#request-ad-response-icon').text("");
    $('#request-ad-response').text("");
                        
    $('#detail-title').text("Create New Event");
    $('#location-type').text("Where is the event happening?");
    $('#location-details').hide();
    $('#location-details1').hide();
    $('#location-details2').hide();
    $('#location-details3').hide();
    $('#location-type1').text("Where is the event happening?");
    $('#paid-event-details').hide();
    $('#budget-type').text("Choose an option");
    $('#event-error').text("");

    $('#name').prop('disabled', false);
    $('#date').prop('disabled', false);
    $('#time').prop('disabled', false);
    $('#location-dropdown-button').prop('disabled', false);
    $('#place').prop('disabled', false);
    $('#about').prop('disabled', false);
    $('#planner').prop('disabled', false);
    $('#submit1').prop('disabled', false);
    $('#cancel1').prop('disabled', false);

    $('#budget-dropdown-button').prop('disabled', true);
    $('#request-budget-button').prop('disabled', true);
    $('#supplies-list-button').prop('disabled', true);
    $('#list-link').prop('disabled', true);
    $('#request-reimbursement-button').prop('disabled', true);
    $('#submit2').prop('disabled', true);
    $('#cancel2').prop('disabled', true);

    $('#date2').prop('disabled', true);
    $('#location-dropdown-button1').prop('disabled', true);
    $('#place2').prop('disabled', true);
    $('#time2').prop('disabled', true);
    $('#supplies-list-button1').prop('disabled', true);
    $('#list-link2').prop('disabled', true);
    $('#signin-form-button').prop('disabled', true);
    $('#signin-link').prop('disabled', true);
    $('#volunteer-form-button').prop('disabled', true);
    $('#volunteer-link').prop('disabled', true);
    $('#carpool-form-button').prop('disabled', true);
    $('#carpool-link').prop('disabled', true);
    $('#submit3').prop('disabled', true);
    $('#cancel3').prop('disabled', true);

    $('#request-ad-button').prop('disabled', true);
    $('#submit4').prop('disabled', true);
    $('#cancel4').prop('disabled', true);

    $('#feedback-form-button').prop('disabled', true);
    $('#notes').prop('disabled', true);
    $('#submit5').prop('disabled', true);
    $('#cancel5').prop('disabled', true);

    $('#submit').prop('disabled', true);
}

// Disable all new event inputs
function disableAllInputs() {
    $('#name').prop('disabled', true);
    $('#date').prop('disabled', true);
    $('#time').prop('disabled', true);
    $('#location-dropdown-button').prop('disabled', true);
    $('#place').prop('disabled', true);
    $('#about').prop('disabled', true);
    $('#planner').prop('disabled', true);
    $('#submit1').prop('disabled', true);
    $('#cancel1').prop('disabled', true);

    $('#budget-dropdown-button').prop('disabled', true);
    $('#request-budget-button').prop('disabled', true);
    $('#supplies-list-button').prop('disabled', true);
    $('#list-link').prop('disabled', true);
    $('#request-reimbursement-button').prop('disabled', true);
    $('#submit2').prop('disabled', true);
    $('#cancel2').prop('disabled', true);

    $('#date2').prop('disabled', true);
    $('#location-dropdown-button1').prop('disabled', true);
    $('#place2').prop('disabled', true);
    $('#time2').prop('disabled', true);
    $('#supplies-list-button1').prop('disabled', true);
    $('#list-link2').prop('disabled', true);
    $('#signin-form-button').prop('disabled', true);
    $('#signin-link').prop('disabled', true);
    $('#volunteer-form-button').prop('disabled', true);
    $('#volunteer-link').prop('disabled', true);
    $('#carpool-form-button').prop('disabled', true);
    $('#carpool-link').prop('disabled', true);
    $('#submit3').prop('disabled', true);
    $('#cancel3').prop('disabled', true);

    $('#request-ad-button').prop('disabled', true);
    $('#submit4').prop('disabled', true);
    $('#cancel4').prop('disabled', true);

    $('#feedback-form-button').prop('disabled', true);
    $('#notes').prop('disabled', true);
    $('#submit5').prop('disabled', true);
    $('#cancel5').prop('disabled', true);

    $('#submit').prop('disabled', true);
}