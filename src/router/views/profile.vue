<script>
import Layout from '@layouts/main.vue'

export default {
  components: { Layout },

  props: {
    seller: {
      type: Object,
      required: true
    }
  },

  page() {
    return {
      title: this.seller.name,
      meta: [
        {
          name: 'description',
          content: `The user profile for ${this.seller.name}.`
        }
      ]
    }
  }
}
</script>

<template>
  <Layout>
    <h1>
      <BaseIcon name="user" />
      {{ seller.name }}
      Profile
    </h1>
    <pre>{{ seller }}</pre>
  </Layout>
</template>
