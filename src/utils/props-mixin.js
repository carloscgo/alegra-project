/* istanbul ignore file */

import truncate from 'lodash/truncate'
import {
  sellerComputed
} from '@state/helpers'
import { MAX_POINTS } from '@state/services/sellers'
import design from '@design'

export default {
  data() {
    return {
      header: { colorOnScroll: 400 },
      leafShow: false,
      imageHead: require("@assets/images/nuk-pro-buildings.png"),
    }
  },

  mounted() {
    this.leafActive()

    window.addEventListener("resize", this.leafActive)
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive)
  },

  methods: {
    truncate(str, length = 15, omission = '...') {
      return truncate(str, {
        length,
        omission
      })
    },

    leafActive() {
      this.leafShow = window.innerWidth >= 768
    },

  },

  computed: {
    ...sellerComputed,

    headerStyle() {
      return {
        background: `url(${this.imageHead}) ${design['global-light-blue-50']}`
      }
    },

    finalizedConcourse() {
      return Boolean(this.allSellers.find(seller => seller.count >= MAX_POINTS))
    }
  }
}
