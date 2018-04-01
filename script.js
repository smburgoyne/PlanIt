// All the components and associated variables
// var isHome = true;
// var isEventDetails = false;
// var isUpcomingEvents = false;
// var isPastEvents = false;

Vue.component('home', {
    template: `<div>
                    <p>Home page</p>
                </div>`
})

Vue.component('upcoming-events', {
    template: `<div>
                    <p>upcoming events page</p>
                </div>`
})

Vue.component('past-events', {
    template: `<div>
                    <p>past events page</p>
                </div>`
})

Vue.component('event-details', {
    template: `<div>
                    <p>new events/event details page</p>
                </div>`
})

Vue.component('navbar', {
    template: `<p>
                    Navbar
                </p>`
})

Vue.component('button', {
    template: `<p>
                    button
                </p>`
})

Vue.component('table', {
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
      isHome: false,
        isEventDetails: false,
        isUpcomingEvents: true,
        isPastEvents: false
    }
  })
