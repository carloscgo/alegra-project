import MaterialKit from "@utils/material-kit"
import { localVue } from '@setupJest'
import Modal from './modal'

function mountComp() {
  localVue.use(MaterialKit)

  return shallowMountView(Modal, {
    localVue
  })
}

describe('@components/modal', () => {
  it('exports a valid component', () => {
    expect(Modal).toBeAComponent()
  })

  let wrapper
  beforeEach(() => {
    wrapper = mountComp()
  })

  describe('methods within component', () => {
    it('closeModal', () => {
      wrapper.vm.closeModal()

      expect(wrapper.emitted().close[0]).toBeTruthy()
    })

    it('hasSlot', () => {
      expect(wrapper.vm.hasSlot(null)).toBeFalsy()
      expect(wrapper.vm.hasSlot('some')).toBeFalsy()
    })
  })
})
