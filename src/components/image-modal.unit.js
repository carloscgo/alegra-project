import MaterialKit from "@utils/material-kit"
import { localVue } from '@setupJest'
import ImageModal from './image-modal.vue'

function mountComp() {
  localVue.use(MaterialKit)

  return shallowMountView(ImageModal, {
    localVue,

    propsData: {
      image: require("@assets/images/nuk-pro-buildings.png"),
    }
  })
}

describe('@components/image-modal', () => {
  it('exports a valid component', () => {
    expect(ImageModal).toBeAComponent()
  })

  let wrapper
  beforeEach(() => {
    wrapper = mountComp()
  })

  describe('watch properties', () => {
    it('open', async (done) => {
      await wrapper.setProps({
        open: true
      })

      await wrapper.vm.$nextTick()

      expect(wrapper.vm.showModal).toBeTruthy()

      jest.clearAllMocks()

      await wrapper.setProps({
        open: false
      })

      await wrapper.vm.$nextTick()

      expect(wrapper.vm.showModal).toBeFalsy()

      done()
    })
  })

  describe('methods within component', () => {
    it('modalHide', () => {
      wrapper.vm.modalHide()

      expect(wrapper.vm.showModal).toBeFalsy()
    })
  })
})
