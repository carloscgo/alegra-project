
<script>
import resizeThrottler from '@utils/resize-throttler'
import MobileMenu from "@layouts/mobile-menu.vue"
import { title } from '@src/app.config'

export default {
  components: {
    'mobile-menu': MobileMenu
  },

  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value)
      }
    },

    colorOnScroll: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      extraNavClasses: "",
      toggledClass: false
    }
  },

  computed: {
    headerText() {
      return {
        title
      }
    },

    textLink() {
      return this.$router.currentRoute.path === '/' ? 'Resultados' : 'Inicio'
    },

    iconLink() {
      return this.$router.currentRoute.path === '/' ? 'content_paste' : 'home'
    },

    routeLink() {
      return this.$router.currentRoute.path === '/' ? 'result' : 'home'
    }
  },

  mounted() {
    this.addEvent()
  },

  beforeDestroy() {
    this.removeEvent()
  },

  methods: {
    addEvent() {
      document.addEventListener("scroll", this.scrollListener)
    },

    removeEvent() {
      document.removeEventListener("scroll", this.scrollListener)
    },

    bodyClick() {
      let bodyClick = document.getElementById("bodyClick")

      if (bodyClick === null) {
        const body = document.querySelector("body")
        const elem = document.createElement("div")

        elem.setAttribute("id", "bodyClick")
        body.appendChild(elem)

        bodyClick = document.getElementById("bodyClick")

        bodyClick.addEventListener("click", this.toggleNavbarMobile)
      } else {
        bodyClick.remove()
      }
    },

    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar
      this.toggledClass = !this.toggledClass
      this.bodyClick()
    },

    handleScroll() {
      const scrollValue = document.body.scrollTop || document.documentElement.scrollTop
      const navbarColor = document.getElementById("toolbar")

      this.currentScrollValue = scrollValue

      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`
        navbarColor.classList.remove("md-transparent")
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = ""
          navbarColor.classList.add("md-transparent")
        }
      }
    },

    scrollListener() {
      resizeThrottler(this.handleScroll)
    }
  }
}
</script>

<template>
  <md-toolbar id="toolbar" md-elevation="0" class="md-transparent md-absolute" :class="extraNavClasses"
    :color-on-scroll="colorOnScroll">
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>

            <md-list>
              <router-link v-slot="{ href, navigate }" :to="{ name: routeLink }" custom>
                <md-list-item :href="href" @click="navigate">
                  <em class="material-icons">{{ iconLink }}</em>
                  <p>{{ textLink }}</p>
                </md-list-item>
              </router-link>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>
