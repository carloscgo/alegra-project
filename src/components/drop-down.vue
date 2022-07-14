<template>
  <div v-click-outside="closeDropDown" :class="[
    { open: isOpen },
    { dropdown: direction === 'down' },
    { dropup: direction === 'up' },
  ]" aria-label="dropdown" @click="toggleDropDown">
    <slot name="title">
      <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)">
        <em :class="icon"></em>
        <p>{{ title }}</p>
      </a>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: "down"
    },
    multiLevel: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isOpen: false
    }
  },

  methods: {
    toggleDropDown() {
      if (this.multiLevel) {
        this.isOpen = true
      } else {
        this.isOpen = !this.isOpen
      }
    },

    closeDropDown() {
      this.isOpen = false
    }
  }
}
</script>
