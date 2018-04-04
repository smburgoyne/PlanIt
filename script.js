var eventName = "New Event";
var isNew = true;
var currentOrg = "SWE"; 
var completion = 0;

Vue.component('tab-details', {
  
    template: `<div class="page">
                    <h1>{{ eventTitle }}</h1>
                </div>`
})

Vue.component('event-table', {

    mounted () {
        
    },

    template: `<table id=event-table>
                    <tr>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </table>`


})

Vue.component('event-row', {
    props: ['name', 'date', 'status'],
    template: `<tr>
                    <td>{{name}}</td>
                    <td>{{date}}</td>
                    <td>{{status}}</td>
                </tr>`
})

Vue.component('progress-bar', {
    template: `<p>
                    progress bar
                </p>`
})

/*
    name of event
    description/about
    primary planner
    date/time
    location
*/
Vue.component('section1', {
    data: function () {
        return {
            isVisible: false
        }
    },
    methods: { 
       
    },
    template: `<div class="inputs">
                    <label for="name">Event Name</label>
                    <input id="name" type="text" required><br>
                    <label for="date">Date</label>
                    <input id="date" type="date" required><br>
                    <label for="time">Time</label>
                    <input id="time" type="time" required><br>
                    <label for="place">Location</label>
                    <input id="place" type="text" required><br>
                    <label for="about">Event Description</label>
                    <textarea id="about" rows="7" cols="50"></textarea><br>
                    <label for="planner">Primary Event Planner</label>
                    <input id="planner" type="text"><br>
                    <p><span id="event-error"></span></p>
                    <input id="submit1" class="save btn btn-light" type="submit" v-on:click="addEvent" value="Save">
                    <button id="cancel1" type="button" class="cancel btn btn-secondary">Cancel</button> 
                </div>`
})

/*
    request budget button
    itemized list - google sheet link
    reinmursement form - link to form
*/
Vue.component('section2', {
    data: function () {
        return {
            isVisible: false
        }
    },
    template: `<div class="inputs">
                    <a id="budget" class="form-link btn btn-light" href="https://goo.gl/forms/BP5Jo2jFLNlibMQw1" role="button" target="_blank">Required Budget</a>
                    <br>
                    <a id="list" class="form-link btn btn-light" href="https://goo.gl/QNxakh" role="button" target="_blank">Supplies List</a>
                    <br>
                    <a id="reimbursement" class="form-link btn btn-light" href="https://goo.gl/forms/7A31GtgQunEcRejo1" role="button" target="_blank">Reimbursement Form</a>
                </div>`
})

/*
    date/time
    location
    supplies - link to itemized list
    sign in sheet - link to form
    volunteers - link to form
    carpool - link to form/sheet
*/
Vue.component('section3', {
    data: function () {
        return {
            isVisible: false
        }
    },
    methods: { 
       
    },
    template: `<div class="inputs">
                    <label for="date">Date</label>
                    <input id="date" type="date"><br>
                    <label for="time">Time</label>
                    <input id="time" type="time"><br>
                    <label for="place">Location</label>
                    <input id="place" type="text"><br>
                    <a id="list" class="form-link btn btn-light" href="https://goo.gl/QNxakh" role="button" target="_blank">Supplies List</a>
                    <br>
                    <a id="signin" class="form-link btn btn-light" href="https://goo.gl/forms/vrGmz4Me8nOMuEJL2" role="button" target="_blank">Event Sign-In Form</a>
                    <br>
                    <a id="volunteers" class="form-link btn btn-light" href="https://goo.gl/forms/6DV4GxeEZTFYZI8S2" role="button" target="_blank">Volunteers Form</a>
                    <br>
                    <a id="carpool" class="form-link btn btn-light" href="https://goo.gl/forms/Lj4CF5iiSh50gExz1" role="button" target="_blank">Carpool Form</a>
                    <br>
                    <input id="submit3" class="save btn btn-light" type="submit" v-on:click="updateEvent" value="Save">
                    <button id="cancel3" type="button" class="cancel btn btn-secondary">Cancel</button>
                </div>`
})

/*
    request to advertise - with response
*/
Vue.component('section4', {
    data: function () {
        return {
            isVisible: false
        }
    },
    template: `<div class="inputs">
                    <a id="advertise" class="form-link btn btn-light" href="https://goo.gl/forms/4QmScVqEhfjktEAe2" role="button" target="_blank">Request to Advertise</a>
                    <br>
                </div>`
})

/*
    link to ffedback form - fake link
    final reminders
    text input for additional comments
*/
Vue.component('section5', {
    data: function () {
        return {
            isVisible: false
        }
    },
    methods: { 
        
    },
    template: `<div class="inputs">
                    <a id="feedback" class="form-link btn btn-light" href="https://goo.gl/forms/4TyWNsoeZSb8Bwz83" role="button" target="_blank">Reimbursement Form</a>
                    <br>
                    <label for="about">Anything else you want to say about this event?</label>
                    <textarea id="notes" rows="7" cols="50"></textarea><br>
                    <p class="form">
                        Remember to do anything else your organization requires you to do, such as
                        sending in attendance, completeing <a href="https://goo.gl/forms/7A31GtgQunEcRejo1" target="_blank">reimbursement forms</a>,
                        and filling out <a href="https://goo.gl/forms/4TyWNsoeZSb8Bwz83" target="_blank">feedback forms</a>.
                    </p>
                    <br>
                    <input id="submit5" class="save btn btn-light" type="submit" v-on:click="addNotes" value="Save">
                    <button id="cancel5" type="button" class="cancel btn btn-secondary">Cancel</button>
                </div>`
})

Vue.component('finishedbutton', {
    methods: {
        completeEvent: function (event) {
            firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
                Status:'Completed'
            });
            $('#name').prop('disabled', true);
            $('#date').prop('disabled', true);
            $('#time').prop('disabled', true);
            $('#date2').prop('disabled', true);
            $('#place2').prop('disabled', true);
            $('#about').prop('disabled', true);
            $('#time2').prop('disabled', true);
            $('#notes').prop('disabled', true);
            $('#planner').prop('disabled', true);
            $('#place').prop('disabled', true);

            $('#submit1').prop('disabled', true);
            $('#cancel1').prop('disabled', true);
            $('#submit3').prop('disabled', true);
            $('#cancel3').prop('disabled', true);
            $('#submit5').prop('disabled', true);
            $('#cancel5').prop('disabled', true);
            $('#submit').prop('disabled', true);
        }
    },
    template: `<button id="submit" type="button" class="new-event btn btn-light" v-on:click="completeEvent">Event is Finished!</button>`
})

// Initialize Vue
const app = new Vue({
    el: '#app',
    data: {
        currentTab: 'Home',
        tabs: [
            'Home',
            'Details',
            'Upcoming' ,
            'Past'
        ]
    },
    computed: {
        currentTabChange: function () {
            return 'tab-' + this.currentTab.toLowerCase();
        }
    }
})




function enableInputs() {
    $('#name').prop('disabled', false);
    $('#date').prop('disabled', false);
    $('#time').prop('disabled', false);
    $('#date2').prop('disabled', false);
    $('#place2').prop('disabled', false);
    $('#about').prop('disabled', false);
    $('#time2').prop('disabled', false);
    $('#notes').prop('disabled', false);
    $('#planner').prop('disabled', false);
    $('#place').prop('disabled', false);

    $('#submit1').prop('disabled', false);
    $('#cancel1').prop('disabled', false);
    $('#submit3').prop('disabled', false);
    $('#cancel3').prop('disabled', false);
    $('#submit5').prop('disabled', false);
    $('#cancel5').prop('disabled', false);
    $('#submit').prop('disabled', false);
}

  function addEvent () {
            var name = $('#name').val();
            var date = $('#date').val();
            var time = $('#time').val();
            var location = $('#place').val();
            

            if(name === "" || date === "" || time === "" || location === "")
            {
                $('#event-error').text("Please enter a valid value for event name, date, time, and/or location.");
            }
            else
            {
                $('#event-error').text("");
                firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + $('#name').val()).update({
                    Date:$('#date').val(),
                    Description:$('#about').val(),
                    Location:$('#place').val(),
                    Notes:"",
                    Planner:$('#planner').val(),
                    Time:$('#time').val(),
                    Status:"Ongoing",
                    Completion: completion
                });
                eventName = $('#name').val();
                newEventName = $('#name').val();
                $('#date2').val($('#date').val());
                $('#place2').val($('#place').val());
                $('#time2').val($('#time').val());
                enableInputs();

                if(completion < 10) {
                    completion +=10; 
                    $('#progressbar > div').css('width', completion+'%');
    
                } 
            }

        }

function requiredBudget() {
    if(completion < 20) {
        completion +=10; 
        $('#progressbar > div').css('width', completion+'%');

    } 
    firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + $('#name').val()).update({
        Completion: completion
    });

}

function suppliesList() {
    if(completion < 30) {
        completion +=10; 
        $('#progressbar > div').css('width', completion+'%');

    } 
    firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + $('#name').val()).update({
        Completion: completion
    });

}

function reimbursementForm() {
    if(completion < 40) {
        completion +=10; 
        $('#progressbar > div').css('width', completion+'%');

    } 
    firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + $('#name').val()).update({
        Completion: completion
    });

}

function suppliesList2() {
    if(completion < 50) {
        completion +=10; 
        $('#progressbar > div').css('width', completion+'%');

    } 
    firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + $('#name').val()).update({
        Completion: completion
    });

}

function updateEvent() {
    firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
                Date:$('#date2').val(),
                Location:$('#place2').val(),
                Time:$('#time2').val()
            });
            eventName = $('#name').val();
}

function addNotes() {
    firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
                Notes:$('#notes').val()
            });
}

function completeSignin() {
    if(completion < 60) {
        completion += 10;
        $('#progressbar > div').css('width', completion+'%');
        firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
                Completion:completion
            });
    }
}

function completeVolunteer() {
    if(completion < 70) {
        completion += 10;
        $('#progressbar > div').css('width', completion+'%');
        firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
                Completion:completion
            });
    }
}

function completeCarpool() {
    if(completion < 80) {
        completion += 10;
        $('#progressbar > div').css('width', completion+'%');
        firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
                Completion:completion
            });
    }
}

function completeAdvertise() {
    if(completion < 90) {
        completion += 10;
        $('#progressbar > div').css('width', completion+'%');
        firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
                Completion:completion
            });
    }
}

function completeReimburse() {
    if(completion < 100) {
        completion += 10;
        $('#progressbar > div').css('width', completion+'%');
        firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + eventName).update({
                Completion:completion
            });
    }
}

function clearForms() {
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
                    enableInputs();
}



$(document).ready(function(){
    var upcomingEventTable = $("#upcomingEventTable");
    var pastEventTable = $("#pastEventTable");
    var dbref = firebase.database().ref('/Organizations/' + currentOrg + "/Events/");
    dbref.on('value', snap => {
        upcomingEventTable.empty();
        pastEventTable.empty();
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
        pastEventTable.append(titleRow);
        upcomingEventTable.append(titleRow2);
        snap.forEach(childsnap => {
            var eventRow = $("<tr></tr>");
            var nameColumn = $("<td></td>").text(childsnap.key);
            var dateColumn = $("<td></td>").text(childsnap.child("Date").val());
            var statusColumn = $("<td></td>").text(childsnap.child("Status").val());
            eventRow.append(nameColumn,dateColumn,statusColumn);
            eventRow.css("cursor", "pointer");
            eventRow.addClass("w3-hover-light-blue");


            eventRow.click(function() {
                eventName = nameColumn.text();
                $("#detailHeader").text(eventName);
                console.log(eventName);
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
                        $('#name').prop('disabled', true);
                        $('#date').prop('disabled', true);
                        $('#time').prop('disabled', true);
                        $('#date2').prop('disabled', true);
                        $('#place2').prop('disabled', true);
                        $('#about').prop('disabled', true);
                        $('#time2').prop('disabled', true);
                        $('#notes').prop('disabled', true);
                        $('#planner').prop('disabled', true);
                        $('#place').prop('disabled', true);

                        $('#submit1').prop('disabled', true);
                        $('#cancel1').prop('disabled', true);
                        $('#submit3').prop('disabled', true);
                        $('#cancel3').prop('disabled', true);
                        $('#submit5').prop('disabled', true);
                        $('#cancel5').prop('disabled', true);
                        $('#submit').prop('disabled', true);
                    }
                    else
                    {
                        enableInputs();
                    }
                })
                $('#home').hide();
                $('#details').show();
                $('#upcoming').hide();
                $('#past').hide();

                

            });
            if(statusColumn.text() == "Ongoing") {
                    upcomingEventTable.append(eventRow);
                    console.log("ongoing event");
            }
            else {
                pastEventTable.append(eventRow);
                console.log("past event");
            }
            
        });
    });
});
