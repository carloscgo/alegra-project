import { mapGetters, mapActions } from 'vuex'

export const sellerComputed = {
  ...mapGetters('sellers', ['currentSeller']),
}
export const sellerMethods = {
  ...mapActions('sellers', ['fetchSeller']),
}

export const imagesComputed = {
  ...mapGetters('images', ['getImages']),
}
export const imagesMethods = {
  ...mapActions('images', ['fetchImages']),
}
