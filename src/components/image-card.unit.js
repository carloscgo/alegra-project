import MaterialKit from "@utils/material-kit"
import * as sellersModule from '@state/modules/sellers'
import * as invoiceModule from '@state/modules/invoice'
import { localVue } from '@setupJest'
import ImageCard from './image-card.vue'

function mountComp() {
  localVue.use(MaterialKit)

  return shallowMountView(ImageCard, {
    localVue,

    propsData: {
      id: 1,
      image: require("@assets/images/nuk-pro-buildings.png"),
      title: 'title',
      sellerId: 1
    },

    ...createComponentMocks({
      store: {
        sellers: sellersModule,
        invoice: invoiceModule,
      }
    })
  })
}

describe('@components/image-card', () => {
  it('exports a valid component', () => {
    expect(ImageCard).toBeAComponent()
  })

  let wrapper
  beforeEach(() => {
    wrapper = mountComp()
  })

  describe('cyclelife component', () => {
    it('mounted', (done) => {
      const context = {
        init: () => { /* */ },
      }

      const init = jest.spyOn(context, 'init')

      ImageCard.mounted.call(context)

      expect(init).toHaveBeenCalled()

      done()
    })
  })

  describe('computed properties', () => {
    it('disabledLike', () => {
      expect(wrapper.vm.disabledLike).toBeFalsy()

      wrapper.vm.liked = true

      expect(wrapper.vm.disabledLike).toBeTruthy()
    })
  })

  describe('methods within component', () => {
    it('init', async (done) => {
      wrapper.vm.fetchSeller = jest.fn(() => Promise.resolve({}))

      await wrapper.vm.init(null)

      expect(wrapper.vm.fetchSeller).not.toHaveBeenCalled()

      jest.clearAllMocks()

      await wrapper.vm.init(1)

      expect(wrapper.vm.fetchSeller).toHaveBeenCalled()

      done()
    })
  })
})
