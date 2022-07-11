<script>
import MainNavBar from '@layouts/main-nav-bar.vue'

export default {
  components: { MainNavBar }
}
</script>

<template>
  <div>
    <MainNavBar />

    <slot />
  </div>
</template>
