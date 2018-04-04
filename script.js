// All the components and associated variables
Vue.component('tab-details', {
    data: function () {
        return {
            eventTitle: 'New Event'
        }
    },
    template: `<div class="page">
                    <h1>{{ eventTitle }}</h1>
                </div>`
})

Vue.component('event-table', {
    data: function () {
        var eventList = new Array();
            var dbref = firebase.database().ref('/Organizations/' + currentOrg + "/Events/");
            dbref.on('value', snap => {
                var i = 0;
                snap.forEach(childsnap => {

                    var nameColumn = childsnap.key;
                    var dateColumn = childsnap.child("Date").val();
                    var statusColumn = childsnap.child("Status").val();
                    eventList[i++] = {name: nameColumn, date: dateColumn, status: statusColumn};
                });
                eventList.sort();
            });
        return {
            events: eventList
        }
    },
    template: `<table id=event-table>
                    <tr>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>Test event</td>
                        <td>03/01/2018</td>
                        <td>Completed</td>
                    </tr>
                    <event-row
                        v-for="event in events"
                        v-bind:name="event.name"
                        v-bind:date="event.date"
                        v-bind:status="event.status"
                        ></event-row>
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
        addEvent: function (event) {
            firebase.database().ref("/Organizations/" + currentOrg + "/Events/" + $('#name').val()).update({
                Date:$('#date').val(),
                Description:$('#about').val(),
                Location:$('#place').val(),
                Planner:$('#planner').val(),
                Time:$('#time').val(),
                Status:"Ongoing"
            });
        }
    },
    template: `<div class="inputs">
                        <form>
                            <label for="name">Event Name</label>
                            <input id="name" type="text"><br>
                            <label for="date">Date</label>
                            <input id="date" type="date"><br>
                            <label for="time">Time</label>
                            <input id="time" type="time"><br>
                            <label for="place">Location</label>
                            <input id="place" type="text"><br>
                            <label for="about">Event Description</label>
                            <textarea id="about"></textarea><br>
                            <label for="planner">Primary Event Planner</label>
                            <input id="planner" type="text"><br>
                            <button id="cancel1" type="button" class="cancel btn btn-secondary">Cancel</button>
                            <button id="submit1" type="button" class="save btn btn-light" v-on:click="addEvent">Save</button>
                        </form>
                    
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
                        <form>
                            <a id="budget" class="btn btn-light" href="https://goo.gl/forms/BP5Jo2jFLNlibMQw1" role="button" target="_blank">Required Budget</a>
                            <br>
                            <a id="list" class="btn btn-light" href="https://goo.gl/QNxakh" role="button" target="_blank">Supplies List</a>
                            <br>
                            <a id="reimbursement" class="btn btn-light" href="https://goo.gl/forms/7A31GtgQunEcRejo1" role="button" target="_blank">Reimbursement Form</a>
                        </form>
                    
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
    template: `<div class="inputs">
                        <form>
                            <label for="date">Date</label>
                            <input id="date" type="date"><br>
                            <label for="time">Time</label>
                            <input id="time" type="time"><br>
                            <label for="place">Location</label>
                            <input id="place" type="text"><br>
                            <a id="list" class="btn btn-light" href="https://goo.gl/QNxakh" role="button" target="_blank">Supplies List</a>
                            <br>
                            <a id="signin" class="btn btn-light" href="https://goo.gl/forms/vrGmz4Me8nOMuEJL2" role="button" target="_blank">Event Sign-In Form</a>
                            <br>
                            <a id="volunteers" class="btn btn-light" href="https://goo.gl/forms/6DV4GxeEZTFYZI8S2" role="button" target="_blank">Volunteers Form</a>
                            <br>
                            <a id="carpool" class="btn btn-light" href="https://goo.gl/forms/Lj4CF5iiSh50gExz1" role="button" target="_blank">Carpool Form</a>
                            <br>
                            <button id="cancel3" type="button" class="cancel btn btn-secondary">Cancel</button>
                            <button id="submit3" type="button" class="save btn btn-light">Save</button>
                        </form>
                    
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
                        <form>
                            <a id="advertise" class="btn btn-light" href="https://goo.gl/forms/4QmScVqEhfjktEAe2" role="button" target="_blank">Request to Advertise</a>
                            <br>
                            <p>response from advertisor</p>
                        </form>
                    
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
    template: `<div class="inputs">
                        <form>
                            <a id="feedback" class="btn btn-light" href="https://goo.gl/forms/4TyWNsoeZSb8Bwz83" role="button" target="_blank">Reimbursement Form</a>
                            <br>
                            <label for="about">Anything else you want to say about this event?</label>
                            <textarea id="about"></textarea><br>
                            <p>
                                Remember to do anything else your organization requires you to do, such as
                                sending in attendance, completeing <a href="https://goo.gl/forms/7A31GtgQunEcRejo1" target="_blank">reimbursement forms</a>,
                                and filling out <a href="https://goo.gl/forms/4TyWNsoeZSb8Bwz83" target="_blank">feedback forms</a>.
                            </p>
                            <br>
                            <button id="cancel5" type="button" class="cancel btn btn-secondary">Cancel</button>
                            <button id="submit5" type="button" class="save btn btn-light">Save</button>
                        </form>
                    
                </div>`
})

// Initialize Vue
new Vue({
    el: '#app',
    data: {
        currentTab: 'Home',
        tabs: [
            'Home',
            'Details',
            'Upcoming',
            'Past'
        ]
    },
    computed: {
        currentTabChange: function () {
            return 'tab-' + this.currentTab.toLowerCase();
        }
    }
})

var currentOrg = "SWE"; 
$(document).ready(function(){
    var eventTable = $("#event-table");
    var dbref = firebase.database().ref('/Organizations/' + currentOrg + "/Events/");
    dbref.once('value').then(snap => {
        snap.forEach(childsnap => {

            var eventRow = $("<tr></tr>");
            var nameColumn = $("<td></td>").text(childsnap.key);
            var dateColumn = $("<td></td>").text(childsnap.child("Date").val());
            var statusColumn = $("<td></td>").text(childsnap.child("Status").val());
            eventRow.append(nameColumn,dateColumn,statusColumn);
            console.log(eventTable);
            eventTable.append(eventRow);
        });
    });
});
