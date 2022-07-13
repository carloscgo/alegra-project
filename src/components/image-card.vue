<template>
  <md-card>
    <md-card-media-cover md-solid>
      <md-card-media md-ratio="1:1">
        <img :src="`${image}?r=${Math.floor(Math.random() * 100000)}`" :alt="title" crossorigin="anonymous" />
      </md-card-media>

      <md-card-area>
        <md-card-header>
          <span class="md-title">{{ title }}</span>
          <span class="md-subhead">{{ provider }}</span>
        </md-card-header>

        <md-card-actions>
          <md-button class="md-button md-rose md-just-icon md-round md-theme-default" :class="$style.iconFavorite"
            @click="onLike">
            <md-icon>favorite</md-icon>
          </md-button>
        </md-card-actions>
      </md-card-area>
    </md-card-media-cover>
  </md-card>
</template>

<script>
import {
  sellerComputed,
  sellerMethods
} from '@state/helpers'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    sellerId: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    ...sellerComputed,

    provider() {
      return this.allSellers.find(provider => provider.id === this.sellerId)?.name || ''
    }
  },

  async mounted() {
    if (this.sellerId) {
      await this.fetchSeller({ id: this.sellerId })
    }
  },

  methods: {
    ...sellerMethods,

    async onLike() {
      await this.increaseCountSeller({ id: this.sellerId }).then(async () => this.fetchAllSellers())
    }
  }
}
</script>

<style lang="scss" module>
@import '@design';

.iconFavorite {
  border-radius: 100% !important;

  i {
    color: $brand-danger  !important;
  }
}
</style>
