import MaterialKit from "@utils/material-kit"
import { validationMixin } from 'vuelidate'
import { localVue } from '@setupJest'
import * as sellersModule from '@state/modules/sellers'
import * as invoiceModule from '@state/modules/invoice'
import * as imagesModule from '@state/modules/images'
import { title, description } from '@src/app.config'
import Home from './home.vue'

const fetchImages =  jest.fn(() => Promise.resolve({}))

function mountComp() {
  localVue.use(MaterialKit)
  localVue.use(validationMixin)

  return shallowMountView(Home, {
    localVue,

    ...createComponentMocks({
      mocks: {
        allSellers: [],
        fetchImages
      },

      store: {
        sellers: sellersModule,
        invoice: invoiceModule,
        images: imagesModule
      }
    })
  })
}

describe('@views/home', () => {
  it('is a valid view', () => {
    expect(Home).toBeAViewComponent()
  })

  let wrapper
  beforeEach(() => {
    wrapper = mountComp()
  })

  describe('cyclelife component', () => {
    it('mounted', (done) => {
      const context = {
        fetchAllSellers: () => { /* */ },
      }

      const fetchAllSellers = jest.spyOn(context, 'fetchAllSellers')

      Home.mounted.call(context)

      expect(fetchAllSellers).toHaveBeenCalled()

      done()
    })
  })

  describe('computed properties', () => {
    it('headerText', () => {
      expect(wrapper.vm.headerText).toEqual({
        title, description
      })
    })

    it('getErrorMessage', () => {
      expect(wrapper.vm.getErrorMessage).not.toEqual(null)
    })

    it('labelButton', () => {
      expect(wrapper.vm.labelButton).toBe('Buscar')

      wrapper.vm.sending = true

      expect(wrapper.vm.labelButton).toBe('Buscando...')
    })

    it('winner', () => {
      expect(wrapper.vm.winner).toEqual({})
    })
  })

  describe('methods within component', () => {
    it('getValidationClass', () => {
      expect(wrapper.vm.getValidationClass('some')).toBeUndefined()
      expect(wrapper.vm.getValidationClass('imageName')).toEqual({"md-invalid": false})
    })

    it('clearForm', () => {
      wrapper.vm.form.imageName = 'search'

      wrapper.vm.clearForm()

      expect(wrapper.vm.form.imageName).toEqual(null)
    })

    it('searchImage', async (done) => {
      const spy = jest.spyOn(wrapper.vm, 'clearForm')

      wrapper.vm.form.imageName = 'search'

      await wrapper.vm.searchImage()

      expect(wrapper.vm.sending).toBeFalsy()
      expect(spy).toHaveBeenCalled()

      done()
    })

    it('showImage', () => {
      wrapper.vm.showImage('image')

      expect(wrapper.vm.showImageModal).toBeTruthy()
      expect(wrapper.vm.imageShowedModal).toBe('image')
    })

    it('hideImage', () => {
      wrapper.vm.hideImage()

      expect(wrapper.vm.showImageModal).toBeFalsy()
      expect(wrapper.vm.imageShowedModal).toBe('')
    })

  })
})
