// All the components
Vue.component('home', {
    template: `<p>
                    Home page
                </p>`
})

Vue.component('upcoming-events', {
    template: `<p>
                    upcoming events page
                </p>`
})

Vue.component('past-events', {
    template: `<p>
                    past events page
                </p>`
})

Vue.component('event-details', {
    template: `<p>
                    new events/event details page
                </p>`
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
      message: 'Hello Vue!'
    }
  })
