import { mapGetters, mapActions } from 'vuex'

export const sellerComputed = {
  ...mapGetters('sellers', ['currentSeller']),
}

export const sellerMethods = {
}
