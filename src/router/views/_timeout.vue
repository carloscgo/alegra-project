<script>
import axios from 'axios'
import Layout from '@layouts/main.vue'
import LoadingView from './_loading.vue'

export default {
  components: { Layout, LoadingView },

  page: {
    title: 'Page timeout',
    meta: [
      {
        name: 'description',
        content: 'The page timed out while loading.' }
    ]
  },

  data() {
    return {
      offlineConfirmed: false
    }
  },

  beforeCreate() {
    axios
      .head('https://google.com/')
      .then(() => {
        window.location.reload()
      })
      .catch(() => {
        this.offlineConfirmed = true
      })
  }
}
</script>

<template>
  <Layout v-if="offlineConfirmed">
    <h1 :class="$style.title">
      The page timed out while loading. Are you sure you're still connected to
      the Internet?
    </h1>
  </Layout>
  <LoadingView v-else />
</template>

<style lang="scss" module>
.title {
  text-align: center;
}
</style>
