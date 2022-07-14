import MaterialKit from "@utils/material-kit"
import { localVue } from '@setupJest'
import Parallax from './parallax'

function mountComp() {
  localVue.use(MaterialKit)

  return shallowMountView(Parallax, {
    localVue
  })
}

describe('@components/parallax', () => {
  it('exports a valid component', () => {
    expect(Parallax).toBeAComponent()
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

      Parallax.mounted.call(context)

      expect(init).toHaveBeenCalled()

      done()
    })
  })

  describe('methods within component', () => {
    it('init', () => {
      const spy = jest.spyOn(wrapper.vm, 'checkForParallax')

      wrapper.vm.init()

      const e = document.createEvent('Event')

       e.initEvent("scroll", true, true)

       window.dispatchEvent(e)

      expect(spy).toHaveBeenCalled()
    })

    it('handleScroll', () => {
      wrapper.vm.handleScroll(30)

      expect(wrapper.vm.styles).toEqual({
        transform: `translate3d(0, ${10}px,0)`
      })
    })

    it('checkForParallax', () => {
      jest.useFakeTimers()

      const spy = jest.spyOn(wrapper.vm, 'handleScroll')

      wrapper.vm.checkForParallax(10)

      jest.runOnlyPendingTimers()

      expect(spy).toHaveBeenCalled()
    })
  })
})
