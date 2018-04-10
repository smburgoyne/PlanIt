/*
*
* For notification-related functions
*
*/

$(document).ready(function () {
    var notificationsTable = $("#notifications-table");
    var dbref = firebase.database().ref('/Organizations/' + currentOrg + "/Events/");
    dbref.on('value', snap => {
        notificationsTable.empty();
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
                    var notificationRow = $("<tr></tr>");
                    var noteColumn = $("<td></td>").text("Is your event free? Remember to complete the Finances section for " + eventName);
                    notificationRow.append(noteColumn);
                    notificationsTable.append(notificationRow);
                    console.log("note - establish budget");
                }

                if(child.child("IsFree").val() == "No")
                {
                    if(child.child("BudgetStatus").val() == "")
                    {
                        // note - request a budget
                        var notificationRow = $("<tr></tr>");
                        var noteColumn = $("<td></td>").text("Remember to request a budget from your Treasurer for " + eventName);
                        notificationRow.append(noteColumn);
                        notificationsTable.append(notificationRow);
                        console.log("note - request budget");
                    }
                    if(child.child('BudgetStatus').val() == "Pending")
                    {
                        // note - check with treasurer
                        var notificationRow = $("<tr></tr>");
                        var noteColumn = $("<td></td>").text("We see that you have requested a budget for " + eventName + ". Make sure to follow up with your Treasurer!");
                        notificationRow.append(noteColumn);
                        notificationsTable.append(notificationRow);
                        console.log("note - check with treasurer");
                    }
                }

                tempDate = new Date(Date.parse(child.child("Date").val()));
                var eventTimeDiff = (tempDate.getTime() - Date.now()) / 86400000;
                // check for location
                if(child.child('Location').val() == "Tbd" && (eventTimeDiff < 14 && eventTimeDiff >= 0))
                {
                    // note - choose a location
                    var notificationRow = $("<tr></tr>");
                    var noteColumn = $("<td></td>").text("Where is your event? Remember to choose a location for " + eventName);
                    notificationRow.append(noteColumn);
                    notificationsTable.append(notificationRow);
                    console.log("note - choose location");
                }
                if(child.child('Location').val() == "On" || child.child('Location').val() == "Off")
                {
                    // note - enter an address
                    var notificationRow = $("<tr></tr>");
                    var noteColumn = $("<td></td>").text("Do you have an address for your event? Make sure to enter an address for " + eventName);
                    notificationRow.append(noteColumn);
                    notificationsTable.append(notificationRow);
                    console.log("note - enter address");
                }

                // check for forms
                if(child.child('CarpoolLink').val() &&
                    child.child('VolLink').val() &&
                    child.child('SigninLink').val() &&
                    (eventTimeDiff < 7 && eventTimeDiff >= 0))
                {
                    //note - courtesy reminder of these forms
                    var notificationRow = $("<tr></tr>");
                    var noteColumn = $("<td></td>").text("Just a friendly reminder that " + eventName + " is in 1 week, so make sure to create sign-in, volunteer, and carpool forms!");
                    notificationRow.append(noteColumn);
                    notificationsTable.append(notificationRow);
                    console.log("note - friendly reminder to create forms");
                }

                // check for ad
                if(child.child('AdStatus') == "" && (eventTimeDiff < 14 && eventTimeDiff >= 0))
                {
                    // note - request for advertising
                    var notificationRow = $("<tr></tr>");
                    var noteColumn = $("<td></td>").text("Have you planned how to market your event? Remember to request advertising for " + eventName);
                    notificationRow.append(noteColumn);
                    notificationsTable.append(notificationRow);
                    console.log("note - request advertising");
                }
                if(child.child('AdStatus') == "Pending" && (eventTimeDiff < 14 && eventTimeDiff >= 0))
                {
                    // note - check with advertiser
                    var notificationRow = $("<tr></tr>");
                    var noteColumn = $("<td></td>").text("We see that you've requested to advertise " + eventName + ". Make sure to follow up with your Advertising Chair!");
                    notificationRow.append(noteColumn);
                    notificationsTable.append(notificationRow);
                    console.log("note - check with advertiser");
                }

                // post notifications
                if(eventTimeDiff <= 0 && eventTimeDiff > -2)
                {
                    // note - reminder to complete event
                    var notificationRow = $("<tr></tr>");
                    var noteColumn = $("<td></td>").text("Remember to fill out feedback forms and any reimbursement forms for " + eventName + ". Also, remember to complete the event!");
                    notificationRow.append(noteColumn);
                    notificationsTable.append(notificationRow);
                    console.log("note - complete event");
                }
                if(eventTimeDiff >= -7 && eventTimeDiff < -2)
                {
                    // note - final reminder
                    var notificationRow = $("<tr></tr>");
                    var noteColumn = $("<td></td>").text("Here is your final reminder to fill out feedback forms and any reimbursement forms for" + eventName + ". Also, remember to complete the event!");
                    notificationRow.append(noteColumn);
                    notificationsTable.append(notificationRow);
                    console.log("note - (final) complete event");
                }
            }
        });
    });
});