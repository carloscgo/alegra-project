<template>
  <md-list
    class="nav-mobile-menu nav-mobile-section-start"
    v-if="navMobileSectionStart === 'true'"
  >
    <slot></slot>
  </md-list>
</template>

<script>
export default {
  props: {
    navMobileSectionStart: {
      type: String,
      default: "false"
    }
  }
}
</script>
