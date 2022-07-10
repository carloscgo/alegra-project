<script>
import Layout from '@layouts/main.vue'

export default {
  components: { Layout },

  props: {
    resource: {
      type: String,
      default: ''
    }
  },

  page: {
    title: '404',
    meta: [{ name: 'description', content: '404' }]
  }
}
</script>

<template>
  <Layout>
    <h1 :class="$style.title">
      404
      <template v-if="resource">
        {{ resource }}
      </template>
      Not Found
    </h1>
  </Layout>
</template>

<style lang="scss" module>
.title {
  text-align: center;
}
</style>
