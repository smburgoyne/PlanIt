// All the components and associated variables
Vue.component('home', {
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

Vue.component('upcoming-events', {
    template: `<div class="page">
                    <p>upcoming events page</p>
                </div>`
})

Vue.component('past-events', {
    template: `<div class="page">
                    <p>past events page</p>
                </div>`
})

Vue.component('event-details', {
    template: `<div class="page">
                    <p>new events/event details page</p>
                </div>`
})

Vue.component('navbar', {
    template: `<div class="navbar">
                    <img src="./logo2.png">
                    <button type="button" class="navbartab btn" v-on:click="$emit('clickpastevents')">Past Events</button>
                    <button type="button" class="navbartab btn" v-on:click="$emit('clickupcomingevents')">Upcoming Events</button>
                    <button type="button" class="navbartab btn" v-on:click="$emit('clicknewevent')">New Event</button>
                    <button type="button" class="navbartab btn" v-on:click="$emit('clickhome')">Home</button>
                </div>`
})

Vue.component('event-table', {
    template: `<p>
                    table
                </p>`
})

Vue.component('progress-bar', {
    template: `<p>
                    progress bar
                </p>`
})

Vue.component('event-section', {
    template: `<p>
                    event section
                </p>`
})

// Initialize Vue
new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        isHome: true,
        isEventDetails: false,
        isUpcomingEvents: false,
        isPastEvents: false
    },
    computed: {
        clickHome: function () {
            isHome = true;
            isEventDetails = false;
            isUpcomingEvents = false;
            isPastEvents = false;
        },
        clickNewEvent: function () {
            isHome = false;
            isEventDetails = true;
            isUpcomingEvents = false;
            isPastEvents = false;
        },
        clickUpcomingEvents: function () {
            isHome = false;
            isEventDetails = false;
            isUpcomingEvents = true;
            isPastEvents = false;
        },
        clickPastEvents: function () {
            this.isHome = false;
            this.isEventDetails = false;
            this.isUpcomingEvents = false;
            this.isPastEvents = true;
        }
    }
})
