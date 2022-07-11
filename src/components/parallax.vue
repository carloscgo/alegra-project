<script>
import debounce from '@utils/debounce'

export default {
  data() {
    return {
      styles: {},
      debounceTimeout: 6
    }
  },

  methods: {
    handleScroll(scrollVal) {
      let oVal = scrollVal / 3

      this.styles = {
        transform: `translate3d(0, ${oVal}px,0)`
      }
    },

    checkForParallax(scrollVal) {
      let fn = debounce(
        () => this.handleScroll(scrollVal),
        this.debounceTimeout
      )

      fn()
    }
  },

  mounted() {
    let self = this

    window.addEventListener("scroll", function() {
      if (window.innerWidth > 991) {
        let scrollVal = this.scrollY

        self.checkForParallax(scrollVal)
      }
    })
  }
}
</script>

<template>
  <div :style="styles">
    <slot />
  </div>
</template>

<style lang="scss" module>
@import '@design';
</style>
