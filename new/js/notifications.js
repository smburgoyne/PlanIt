/*
*
* For notification-related functions
*
*/

$(document).ready(function () {
    var noteCount = 0;
    var dbref = firebase.database().ref('/Organizations/' + currentOrg + "/Events/");
    dbref.on('value', snap => {
        var notificationsTable = $("#notifications-table");
        var notificationsDropdown = $('#notification-dropdown-menu');
        notificationsTable.empty();
        notificationsDropdown.empty();
        snap.forEach(child => {
            if (child.child("Status").val() == "Ongoing")
            {
                var eventName = child.key;
                // check for budget
                var tempDate = parseInt(child.child("Created").val());
                var createTimeDiff = (Date.now() - tempDate) / 86400000;
                if(child.child("IsFree").val() == "" && createTimeDiff > 3)
                {
                    // note - establish budget
                    addNotification("Is your event free? Remember to complete the Finances section for " + eventName);
                    console.log("note - establish budget");
                    noteCount += 1;
                }

                if(child.child("IsFree").val() == "No")
                {
                    if(child.child("BudgetStatus").val() == "")
                    {
                        // note - request a budget
                        addNotification("Remember to request a budget from your Treasurer for " + eventName);
                        console.log("note - request budget");
                        noteCount += 1;
                    }
                    if(child.child('BudgetStatus').val() == "Pending")
                    {
                        // note - check with treasurer
                        addNotification("We see that you have requested a budget for " + eventName + ". Make sure to follow up with your Treasurer!");
                        console.log("note - check with treasurer");
                        noteCount += 1;
                    }
                }

                tempDate = new Date(Date.parse(child.child("Date").val()));
                var eventTimeDiff = (tempDate.getTime() - Date.now()) / 86400000;
                // check for location
                if(child.child('Location').val() == "Tbd" && (eventTimeDiff < 14 && eventTimeDiff >= 0))
                {
                    // note - choose a location
                    addNotification("Where is your event? Remember to choose a location for " + eventName);
                    console.log("note - choose location");
                    noteCount += 1;
                }
                if(child.child('Location').val() == "On" || child.child('Location').val() == "Off")
                {
                    // note - enter an address
                    addNotification("Do you have an address for your event? Make sure to enter an address for " + eventName);
                    console.log("note - enter address");
                    noteCount += 1;
                }

                // check for forms
                if((child.child('CarpoolLink').val() == "" ||
                    child.child('VolLink').val() == "" ||
                    child.child('SigninLink').val() == "") &&
                    (eventTimeDiff < 7 && eventTimeDiff >= 0))
                {
                    //note - courtesy reminder of these forms
                    addNotification("Just a friendly reminder that " + eventName + " is in 1 week, so make sure to create sign-in, volunteer, and carpool forms!");
                    console.log("note - friendly reminder to create forms");
                    noteCount += 1;
                }

                // check for ad
                if(child.child('AdStatus') == "" && (eventTimeDiff < 14 && eventTimeDiff >= 0))
                {
                    // note - request for advertising
                    addNotification("Have you planned how to market your event? Remember to request advertising for " + eventName);
                    console.log("note - request advertising");
                    noteCount += 1;
                }
                if(child.child('AdStatus') == "Pending" && (eventTimeDiff < 14 && eventTimeDiff >= 0))
                {
                    // note - check with advertiser
                    addNotification("We see that you've requested to advertise " + eventName + ". Make sure to follow up with your Advertising Chair!");
                    console.log("note - check with advertiser");
                    noteCount += 1;
                }

                // post notifications
                if(eventTimeDiff <= 0 && eventTimeDiff > -2)
                {
                    // note - reminder to complete event
                    addNotification("Remember to fill out feedback forms and any reimbursement forms for " + eventName + ". Also, remember to complete the event!");
                    console.log("note - complete event");
                    noteCount += 1;
                }
                if(eventTimeDiff >= -7 && eventTimeDiff < -2)
                {
                    // note - final reminder
                    addNotification("Here is your final reminder to fill out feedback forms and any reimbursement forms for" + eventName + ". Also, remember to complete the event!");
                    console.log("note - (final) complete event");
                    noteCount += 1;
                }
            }
        });
        $('#badge').text(noteCount);
    });
});

function addNotification(notificationString)
{
    let notificationsTable = $("#notifications-table");
    let notificationsDropdown = $('#notification-dropdown-menu');

    let notificationRow = $("<tr></tr>");
    let noteColumn = $("<td></td>").text(notificationString);
    notificationRow.append(noteColumn);
    notificationsTable.append(notificationRow);

    let notificationLi = $("<li></li>");
    notificationLi.attr("role", "presentation");
    let notificationA = $("<a></a>").text(notificationString);
    notificationA.attr("role", "menuitem");
    notificationA.attr("href", "#");
    notificationLi.append(notificationA);
    notificationsDropdown.append(notificationLi);
}