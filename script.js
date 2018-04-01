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
                    <p>upcoming events page</p>
                </div>`
})

Vue.component('tab-past', {
    template: `<div class="page">
                    <p>past events page</p>
                </div>`
})

Vue.component('tab-details', {
    template: `<div class="page">
                    <p>new events/event details page</p>
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
