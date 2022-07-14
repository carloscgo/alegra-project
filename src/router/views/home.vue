<script>
import isEmpty from 'lodash/isEmpty'
import sumBy from 'lodash/sumBy'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'
import { title, description } from '@src/app.config'
import Layout from '@layouts/main.vue'
import ImageCard from '@components/image-card.vue'
import ImageModal from '@components/image-modal.vue'
import {
  imagesComputed,
  invoiceComputed,
  imagesMethods,
  sellerMethods,
  invoiceMethods
} from '@state/helpers'
import propsMixin from '@utils/props-mixin'

export default {
  components: { Layout, ImageCard, ImageModal },

  bodyClass: "index-page",

  page: {
    title: 'Home',
    meta: [{ name: 'description', content: description }]
  },

  mixins: [validationMixin, propsMixin],

  data() {
    return {
      rules: [
        'Debes realizar la búsqueda de una imagen usando el formulario.',
        'Se mostrará una imagen por cada vendedor.',
        'Debes seleccionar la imagen que más te guste, de esta forma el vendedor acumulará puntos.',
        'El vendedor que acumule 20 puntos gana el concurso, y finaliza la carrera.'
      ],
      errors: {
        required: 'El nombre de la imagen es requerida',
        length: 'El nombre de la imagen es inválida'
      },
      form: {
        imageName: ''
      },
      sending: false,
      showImageModal: false,
      imageShowedModal: ''
    }
  },

  validations: {
    form: {
      imageName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
      }
    }
  },

  computed: {
    ...imagesComputed,
    ...invoiceComputed,

    headerText() {
      return {
        title,
        description
      }
    },

    getErrorMessage() {
      if (!this.$v.form.imageName.required) return this.errors.required
      else if (!this.$v.form.imageName.minlength || !this.$v.form.imageName.maxlength) return this.errors.length
      else return null
    },

    labelButton() {
      return this.sending ? 'Buscando...' : 'Buscar'
    },

    winner() {
      if (this.finalizedConcourse) {
        return this.allSellers.reduce((prev, current) => (prev.count > current.count) ? prev : current, {})
      }

      return {}
    }
  },

  watch: {
    winner: {
      async handler(newValue) {
        const sellerId = newValue.id

        await this.findInvoice({ sellerId })

        if (!isEmpty(newValue)) {
          this.handlerAddInvoice()
        }
      },
      immediate: true
    }
  },

  mounted() {
    this.fetchAllSellers()
  },

  methods: {
    ...imagesMethods,
    ...sellerMethods,
    ...invoiceMethods,

    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },

    clearForm() {
      this.$v.$reset()

      this.form.imageName = null
    },

    async searchImage() {
      this.sending = true

      await this.fetchImages({ query: this.form.imageName }).finally(() => {
        this.sending = false

        this.clearForm()
      })
    },

    validateSearch() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.searchImage()
      }
    },

    showImage(image) {
      this.showImageModal = true
      this.imageShowedModal = image
    },

    hideImage() {
      this.showImageModal = false
      this.imageShowedModal = ''
    },

    totalAmount() {
      return sumBy(this.allSellers, ({ count }) => count)
    },

    async handlerAddInvoice() {
      const seller = this.winner

      if (isEmpty(this.currentInvoice) && !isEmpty(seller)) {
        const amount = this.totalAmount()

        await this.addInvoice({ seller, amount }).then(async () => {
          const sellerId = this.winner.id

          await this.findInvoice({ sellerId })
        })
      }
    }
  }
}
</script>

<template>
  <Layout class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="brand">
            <h1 v-text="headerText.title"></h1>
            <h3 v-text="headerText.description"></h3>
          </div>
        </div>
      </div>
    </parallax>

    <div class="main main-raised">
      <div class="section section-basic">
        <div class="container">
          <div class="title">
            <h2>Concurso</h2>

            <div v-if="finalizedConcourse">
              <div class="alert alert-success">
                <div class="container">
                  <div class="alert-icon">
                    <md-icon>check</md-icon>
                  </div>
                  El concurso la finalizado.
                </div>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <form novalidate class="md-layout" @submit.prevent="validateSearch">
                  <md-card class="md-layout-item md-size-50 md-small-size-100">
                    <md-card-header>
                      <div class="md-title">Busca una imagen:</div>
                    </md-card-header>

                    <md-card-content>
                      <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                          <md-field :class="getValidationClass('imageName')">
                            <label for="image-name">Ingresa el texto de la búsqueda (carro, moto, patineta)</label>
                            <md-input id="image-name" v-model="form.imageName" name="image-name"
                              autocomplete="given-name" :disabled="sending" />
                            <span v-if="$v.$invalid" class="md-error">{{ getErrorMessage }}</span>
                          </md-field>
                        </div>
                      </div>
                    </md-card-content>

                    <md-card-actions>
                      <md-button type="submit" class="md-default" :disabled="sending">{{ labelButton }}</md-button>
                    </md-card-actions>
                  </md-card>
                </form>

                <div class="md-layout-item md-size-30 md-medium-size-100">
                  <h3>Reglas de concurso</h3>

                  <md-list>
                    <md-list-item v-for="(rule, index) in rules" :key="index" :class="$style.listItem">{{ rule }}
                    </md-list-item>
                  </md-list>
                </div>

                <div class="md-layout md-gutter">
                  <ImageCard v-for="(img, index) in getImages" :id="img.id" :key="index" :title="img.title"
                    :image="img.image" :seller-id="img.seller_id" @click="showImage(img.image)" />

                  <ImageModal :open="showImageModal" :image="imageShowedModal" @onClose="hideImage" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" module>
.listItem>div>div {
  white-space: pre-wrap;
}
</style>
