import Vue from 'vue'
import VueRouter from 'vue-router'
// https://github.com/declandewet/vue-meta
import VueMeta from 'vue-meta'
// Adds a loading bar at the top during page loads.
import NProgress from 'nprogress/nprogress'
import routes from './routes'

Vue.use(VueRouter)
Vue.use(VueMeta, {
  // The component option name that vue-meta looks for meta info on.
  keyName: 'page',
})

const router = new VueRouter({
  routes,
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  mode: 'history',
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

const setResolve = async (route, next, routeTo, routeFrom) => {
  await new Promise((resolve, reject) => {
    // If a `beforeResolve` hook is defined, call it with
    // the same arguments as the `beforeEnter` hook.
    if (route.meta && route.meta.beforeResolve) {
      route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
        // If the user chose to redirect...
        if (args.length > 0) {
          // Complete the redirect.
          next(...args)
          reject(new Error('Redirected'))
        } else {
          resolve()
        }
      })
    } else {
      // Otherwise, continue resolving the route.
      resolve()
    }
  })
}

// Before each route evaluates...
router.beforeEach((_routeTo, routeFrom, next) => {
  // If this isn't an initial page load...
  if (routeFrom.name !== null) {
    // Start the route progress bar.
    NProgress.start()
  }

  return next()
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
  // Create a `beforeResolve` hook, which fires whenever
  // `beforeRouteEnter` and `beforeRouteUpdate` would. This
  // allows us to ensure data is fetched even when params change,
  // but the resolved route does not. We put it in `meta` to
  // indicate that it's a hook we created, rather than part of
  // Vue Router (yet?).
  try {
    // For each matched route...
    for (const route of routeTo.matched) {
      await setResolve(route, next, routeTo, routeFrom)
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return
  }

  // If we reach this point, continue resolving the route.
  next()
})

// When each route is finished evaluating...
router.afterEach((_routeTo, _routeFrom) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
