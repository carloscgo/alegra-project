
<script>
import isEmpty from 'lodash/isEmpty'
import propsMixin from '@utils/props-mixin'
import {
  invoiceComputed,
  sellerMethods,
} from '@state/helpers'

export const STORAGE = 'idList'

export default {
  mixins: [propsMixin],

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

  data() {
    return {
      provider: '',
      liked: false
    }
  },

  computed: {
    ...invoiceComputed,

    disabledLike() {
      return this.liked || this.existsInStorage(this.id)
    }
  },

  mounted() {
    this.init(this.sellerId)
  },

  methods: {
    ...sellerMethods,

    async init(sellerId) {
      if (sellerId) {
        const seller = await this.fetchSeller({ id: sellerId })

        if (!isEmpty(seller)) {
          this.provider = seller.name
        }
      }
    },

    getStorage() {
      return JSON.parse(localStorage.getItem(STORAGE)) || []
    },

    addInStorage(id) {
      const idList = this.getStorage()

      if (!idList.includes(id)) {
        idList.push(id)

        localStorage.setItem(STORAGE, JSON.stringify(idList))
      }
    },

    existsInStorage(id) {
      const idList = this.getStorage()

      return idList.includes(id)
    },

    async onLike() {
      await this.increaseCountSeller({ id: this.sellerId }).then(async () => {
        await this.fetchAllSellers()

        this.liked = true

        this.addInStorage(this.id)
      })
    },

    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<template>
  <div class="md-layout-item md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100" :class="$style.hover">
    <md-card>
      <md-card-media-cover md-solid>
        <div class="md-card-media md-ratio-1-1" @click="onClick">
          <img :src="image" :alt="title" />
        </div>

        <md-card-area>
          <div class="md-card-header" @click="onClick">
            <span class="md-title"><strong>Vendedor:</strong> {{ truncate(provider) }}</span>
            <span class="md-subhead"><strong>Categoria:</strong> {{ truncate(title) }}</span>
          </div>

          <md-card-actions v-if="!finalizedConcourse" :class="$style.cardActions">
            <md-button class="md-button md-just-icon md-round md-theme-default"
              :class="[$style.iconFavorite, disabledLike ? '' : 'md-rose']" :disabled="disabledLike" @click="onLike">
              <md-icon>favorite</md-icon>
            </md-button>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.hover {
  cursor: pointer;
}

.cardActions {
  border-top: none !important;
}

.iconFavorite {
  border-radius: 100% !important;

  i {
    color: $brand-danger  !important;
  }

  button[disabled] {
    pointer-events: none;
    cursor: no-drop;
  }
}
</style>
