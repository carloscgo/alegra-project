<script>
import { sellerComputed } from '@state/helpers'
import NavBarRoutes from './nav-bar-routes.vue'

export default {
  components: { NavBarRoutes },

  data() {
    return {
      persistentNavRoutes: [
        {
          name: 'home',
          title: 'Home'
        }
      ],

      sellerNavRoutes: [
        {
          name: 'seller',
          title: () => {
            const seller = this.currentSeller?.name

            return seller ? `Logged in as ${seller}` : ''
          },
          params: {
            id: '1'
          }
        }
      ]
    }
  },

  computed: {
    ...sellerComputed
  }
}
</script>

<template>
  <ul :class="$style.container">
    <NavBarRoutes :routes="persistentNavRoutes" />
    <NavBarRoutes :routes="sellerNavRoutes" />
  </ul>
</template>

<style lang="scss" module>
@import '@design';

.container {
  padding: 0;
  margin: 0 0 $size-grid-padding;
  text-align: center;
  list-style-type: none;

  > li {
    display: inline-block;
    margin-right: $size-grid-padding;
  }
}
</style>
