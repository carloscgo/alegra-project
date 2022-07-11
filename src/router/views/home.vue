<script>
import { title, description } from '@src/app.config'
import Layout from '@layouts/main.vue'
import Parallax from "@components/parallax.vue"

export default {
  components: { Layout, Parallax },

  bodyClass: "index-page",

  page: {
    title: 'Home',
    meta: [{ name: 'description', content: description }],

    image: {
      type: String,
      default: require("@assets/images/nuk-pro-buildings.png")
    },
    leaf1: {
      type: String,
      default: require("@assets/images/leaf1.png")
    },
    leaf2: {
      type: String,
      default: require("@assets/images/leaf2.png")
    },
    leaf3: {
      type: String,
      default: require("@assets/images/leaf3.png")
    },
    leaf4: {
      type: String,
      default: require("@assets/images/leaf4.png")
    }
  },

  data() {
    return {
      leafShow: false
    }
  },

  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      }
    },

    headerText() {
      return {
        title,
        description
      }
    }
  },

  mounted() {
    this.leafActive()

    window.addEventListener("resize", this.leafActive)
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive)
  },

  methods: {
    leafActive() {
      this.leafShow = window.innerWidth >= 768
    }
  }
}
</script>

<template>
  <Layout class="wrapper">
    <Parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <img v-show="leafShow" :src="leaf4" alt="leaf4" class="leaf4" />
            <img v-show="leafShow" :src="leaf3" alt="leaf3" class="leaf3" />
            <img v-show="leafShow" :src="leaf2" alt="leaf2" class="leaf2" />
            <img v-show="leafShow" :src="leaf1" alt="leaf1" class="leaf1" />
            <div class="brand">
              <h1 v-text="headerText.title"></h1>
              <h3 v-text="headerText.description"></h3>
            </div>
          </div>
        </div>
      </div>
    </Parallax>

    <div class="main main-raised">
    </div>
  </Layout>
</template>
