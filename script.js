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
    template: `<div class="page">
                    <h1>{{ eventTitle }}</h1>
                    <progress-bar></progress-bar>
                    <section1></section1>
                    <section2></section2>
                    <section3></section3>
                    <section4></section4>
                    <section5></section5>
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

Vue.component('event-section', {
    template: `<p>
                    event section
                </p>`
})

Vue.component('section1', {
    template: `<p>
                    section 1
                </p>
                <event-section></event-section>`
})

Vue.component('section2', {
    template: `<p>
                    section 2
                </p>
                <event-section></event-section>`
})

Vue.component('section3', {
    template: `<p>
                    section 3
                </p>
                <event-section></event-section>`
})

Vue.component('section4', {
    template: `<p>
                    section 4
                </p>
                <event-section></event-section>`
})

Vue.component('section5', {
    template: `<p>
                    section 5
                </p>
                <event-section></event-section>`
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
