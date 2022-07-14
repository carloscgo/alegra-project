
<script>
export default {
  props: {
    transparent: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    closeModal() {
      this.$emit("close")
    },

    hasSlot(name) {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    }
  }
}
</script>

<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div v-click-outside="closeModal" class="modal-container" :class="{ transparent: 'transparent' }">
          <div v-if="hasSlot('header')" class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body text-center">
            <slot name="body"></slot>
          </div>

          <div v-if="hasSlot('footer')" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.modal-container.transparent {
  background-color: transparent !important;
  box-shadow: none !important;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
