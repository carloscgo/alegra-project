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

<template>
  <md-list v-if="navMobileSectionStart === 'true'" class="nav-mobile-menu nav-mobile-section-start">
    <slot></slot>
  </md-list>
</template>
