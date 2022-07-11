<script>
import MainNavBar from '@layouts/main-nav-bar.vue'

export default {
  components: { MainNavBar }
}
</script>

<template>
  <div :class="$style.container">
    <MainNavBar />

    <slot />
  </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  min-width: $size-content-width-min;
  max-width: $size-content-width-max;
  margin: 0 auto;
}
</style>
