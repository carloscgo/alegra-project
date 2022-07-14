<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: false
    },
    image: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      showModal: false
    }
  },

  watch: {
    open(newValue) {
      this.showModal = newValue
    }
  },

  methods: {
    modalHide() {
      this.showModal = false

      this.$emit('onClose')
    }
  }
}
</script>

<template>
  <modal v-if="showModal" @close="modalHide">
    <template slot="header">
      <md-button class="md-just-icon md-round modal-default-button" :class="$style.buttonClose" @click="modalHide">
        <md-icon :class="$style.close">clear</md-icon>
      </md-button>
    </template>

    <template slot="body">
      <md-card :class="$style.card">
        <md-card-media-cover>
          <md-card-media md-ratio="1:1">
            <img :src="image" alt="preview" />
          </md-card-media>
        </md-card-media-cover>
      </md-card>
    </template>
  </modal>
</template>

<style lang="scss" module>
@import '@design';

.buttonClose {
  background-color: $white  !important;

  @media (screen and min-width: 470px) {
    left: calc(100% - 15px) !important;
  }
}

.close {
  font-size: 20px !important;
  font-weight:  !important;
  color: $black  !important;
}
</style>
