<script>
import debounce from '@utils/debounce'

export default {
  data() {
    return {
      styles: {},
      debounceTimeout: 6
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const self = this

      window.addEventListener("scroll", function () {
        if (window.innerWidth > 991) {
          const scrollVal = this.scrollY

          self.checkForParallax(scrollVal)
        }
      })
    },

    handleScroll(scrollVal) {
      const oVal = scrollVal / 3

      this.styles = {
        transform: `translate3d(0, ${oVal}px,0)`
      }
    },

    checkForParallax(scrollVal) {
      const fn = debounce(
        () => this.handleScroll(scrollVal),
        this.debounceTimeout
      )

      fn()
    }
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
