import MobileMenuLayout from './mobile-menu.vue'

describe('@layouts/mobile-menu', () => {
  it('renders it is not content', () => {
    const slotContent = '<p>Hello!</p>'
    const { element } = shallowMount(MobileMenuLayout, {
      slots: {
        default: slotContent
      }
    })
    expect(element.innerHTML).toBeUndefined()
  })

  it('renders its not content', () => {
    const slotContent = '<p>Hello!</p>'
    const { element } = shallowMount(MobileMenuLayout, {
      slots: {
        default: slotContent
      },
      propsData: {
        navMobileSectionStart: 'true'
      }
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
