<script>
import Layout from '@layouts/main.vue'

export default {
  components: { Layout },

  page: {
    title: 'Loading page...',
    meta: [{ name: 'description', content: 'Loading page...' }]
  }
}
</script>

<template>
  <Layout>
    <Transition appear>
      <md-icon class="md-size-5x far fa-sync" />
    </Transition>
  </Layout>
</template>
