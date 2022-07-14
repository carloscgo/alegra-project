import { mapGetters, mapActions } from 'vuex'

export const sellerComputed = {
  ...mapGetters('sellers', ['currentSeller', 'allSellers']),
}
export const sellerMethods = {
  ...mapActions('sellers', ['fetchSeller', 'fetchAllSellers', 'increaseCountSeller']),
}

export const imagesComputed = {
  ...mapGetters('images', ['getImages']),
}
export const imagesMethods = {
  ...mapActions('images', ['fetchImages']),
}

export const invoiceComputed = {
  ...mapGetters('invoice', ['currentInvoice']),
}
export const invoiceMethods = {
  ...mapActions('invoice', ['addInvoice', 'findInvoice']),
}
