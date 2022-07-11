import MainNavBarLayout from './main-nav-bar'

describe('@layouts/main-nav-bar', () => {
  it('renders its content', () => {
    const slotContent = '<p>Hello!</p>'
    const { element } = shallowMount(MainNavBarLayout, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
