import MaterialKit from "@utils/material-kit"
import { localVue } from '@setupJest'
import { title } from '@src/app.config'
import MainNavBarLayout from './main-nav-bar.vue'

function mountComp() {
  localVue.use(MaterialKit)

  return shallowMountView(MainNavBarLayout, {
    localVue,

    propsData: {
      type: 'default',
      colorOnScroll: 10
    },

    ...createComponentMocks({
      mocks: {
        $router: {
          currentRoute: {
            path: '/'
          }
        }
      }
    })
  })
}

describe('@layouts/main-nav-bar', () => {
  it('exports a valid component', () => {
    expect(MainNavBarLayout).toBeAComponent()
  })

  let wrapper
  beforeEach(() => {
    wrapper = mountComp()
  })

  describe('cyclelife component', () => {
    it('mounted', (done) => {
      const context = {
        addEvent: () => { /* */ },
      }

      const addEvent = jest.spyOn(context, 'addEvent')

      MainNavBarLayout.mounted.call(context)

      expect(addEvent).toHaveBeenCalled()

      done()
    })

    it('beforeDestroy', (done) => {
      const context = {
        removeEvent: () => { /* */ },
      }

      const removeEvent = jest.spyOn(context, 'removeEvent')

      MainNavBarLayout.beforeDestroy.call(context)

      expect(removeEvent).toHaveBeenCalled()

      done()
    })
  })

  describe('computed properties', () => {
    it('headerText', () => {
      expect(wrapper.vm.headerText).toEqual({ title })
    })

    describe('for route path "/"', () => {
      it('textLink', () => {
        expect(wrapper.vm.textLink).toBe('Resultados')
      })

      it('iconLink', () => {
        expect(wrapper.vm.iconLink).toBe('content_paste')
      })

      it('routeLink', () => {
        expect(wrapper.vm.routeLink).toBe('result')
      })
    })

    describe.skip('for route path is not "/"', () => {
      const setRoutePath = () => {
        wrapper.vm.$router = {
          currentRoute: {
            path: '/result'
          }
        }
      }

      it('textLink', async (done) => {
        setRoutePath()

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.textLink).toBe('Inicio')

        done()
      })

      it('iconLink', async (done) => {
        setRoutePath()

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.iconLink).toBe('home')

        done()
      })

      it('routeLink', async (done) => {
        setRoutePath()

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.routeLink).toBe('home')

        done()
      })
    })
  })
})
