import Vue from 'vue'
import router from '@router'
import store from '@state/store'
import MaterialKit from "@utils/material-kit"
import App from './app.vue'

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

Vue.use(MaterialKit)

const NavbarStore = {
  showNavbar: false
}

Vue.mixin({
  data() {
    return {
      NavbarStore
    }
  }
})

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
