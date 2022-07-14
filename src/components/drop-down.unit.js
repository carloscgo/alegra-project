import MaterialKit from "@utils/material-kit"
import { localVue } from '@setupJest'
import DropDown from './drop-down.vue'

function mountComp() {
  localVue.use(MaterialKit)

  return shallowMount(DropDown, {
    localVue
  })
}

describe('@components/drop-down', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mountComp()
  })

  it('exports a valid component', () => {
    expect(DropDown).toBeAComponent()
  })

  describe('methods within component', () => {
    it('toggleDropDown when multiLevel is true', async (done) => {
       await wrapper.setProps({
        multiLevel: true
      })

      wrapper.vm.toggleDropDown()

      expect(wrapper.vm.isOpen).toBeTruthy()

      done()
    })

    it('toggleDropDown when multiLevel is false', async (done) => {
       await wrapper.setProps({
        multiLevel: false
      })

      wrapper.vm.isOpen = false

      wrapper.vm.toggleDropDown()

      expect(wrapper.vm.isOpen).toBeTruthy()

      wrapper.vm.toggleDropDown()

      expect(wrapper.vm.isOpen).toBeFalsy()

      done()
    })

    it('closeDropDown',  () => {
      wrapper.vm.closeDropDown()

      expect(wrapper.vm.isOpen).toBeFalsy()
    })
  })
})
