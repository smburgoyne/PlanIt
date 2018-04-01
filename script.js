// All the components and associated variables
Vue.component('tab-home', {
    template: `<div class="page">
                    <h1>PlanIt</h1>
                    <img src="./logo2.png" class="home-img">
                    <p>
                        PlanIt is the only event-planning app you'll need. Here, you'll be able to see 
                        everything that goes into event planning and be able to track the progress of every task.
                        In a world of event planning tasks, all you need to do is visit PlanIt!
                    </p>
                    <div>
                    <button type="button" class="new-event btn btn-light">New Event</button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-secondary"> Upcoming Events</button>
                        <button type="button" class="btn btn-secondary">Past Events</button>
                    </div>
                </div>`
})

Vue.component('tab-upcoming', {
    template: `<div class="page">
                    <h1>Upcoming Events</h1>
                    <event-table></event-table>
                </div>`
})

Vue.component('tab-past', {
    template: `<div class="page">
                    <h1>Past Events</h1>
                    <event-table></event-table>
                </div>`
})

Vue.component('tab-details', {
    data: function () {
        return {
            eventTitle: 'New Event'
        }
    },
    // template: `<div class="page">
    //                 <h1>{{ eventTitle }}</h1>
    //                 <progress-bar></progress-bar>
    //                 <section1></section1>
    //                 <section2></section2>
    //                 <section3></section3>
    //                 <section4></section4>
    //                 <section5></section5>
    //             </div>`
    template: `<div class="page">
                <h1>{{ eventTitle }}</h1>
                <progress-bar></progress-bar>
                <section1></section1>
            </div>`
})

Vue.component('event-table', {
    template: `<table>
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
                </table>`
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
    data: function() {
        return {
            isVisible: false
        }
    },
    template: `<div class="section">
                    <div class="section-header">
                        <p class="section-title">What Is the Event?</p>
                        <button class="drop-down" v-on:click="isVisible=!isVisible">
                            <i class="material-icons">keyboard_arrow_down</i>
                        </button>
                    </div>
                    <div v-if="isVisible" class="inputs">
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
                            <button id="submit1" type="button" class="save btn btn-light">Save</button>
                        </form>
                    </div>
                </div>`
})

/*
    request budget button
    itemized list - google sheet link
    reinmursement form - link to form
*/
Vue.component('section2', {
    data: function() {
        return {
            isVisible: false
        }
    },
    template: `<div class="section">
                    <div class="section-header">
                        <p class="section-title">Finances</p>
                        <button class="drop-down" v-on:click="isVisible=!isVisible">
                            <i class="material-icons">keyboard_arrow_down</i>
                        </button>
                    </div>
                    <div v-if="isVisible">
                        <p>stuff</p>
                    </div>
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
    data: function() {
        return {
            isVisible: false
        }
    },
    template: `<div class="section">
                    <div class="section-header">
                        <p class="section-title">Logistics</p>
                        <button class="drop-down" v-on:click="isVisible=!isVisible">
                            <i class="material-icons">keyboard_arrow_down</i>
                        </button>
                    </div>
                    <div v-if="isVisible">
                        <p>stuff</p>
                    </div>
                </div>`
})

/*
    request to advertise - with response
*/
Vue.component('section4', {
    data: function() {
        return {
            isVisible: false
        }
    },
    template: `<div class="section">
                    <div class="section-header">
                        <p class="section-title">Marketing</p>
                        <button class="drop-down" v-on:click="isVisible=!isVisible">
                            <i class="material-icons">keyboard_arrow_down</i>
                        </button>
                    </div>
                    <div v-if="isVisible">
                        <p>stuff</p>
                    </div>
                </div>`
})

/*
    link to ffedback form - fake link
    final reminders
    text input for additional comments
*/
Vue.component('section5', {
    data: function() {
        return {
            isVisible: false
        }
    },
    template: `<div class="section">
                    <div class="section-header">
                        <p class="section-title">Post Event Tasks</p>
                        <button class="drop-down" v-on:click="isVisible=!isVisible">
                            <i class="material-icons">keyboard_arrow_down</i>
                        </button>
                    </div>
                    <div v-if="isVisible">
                        <p>stuff</p>
                    </div>
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
