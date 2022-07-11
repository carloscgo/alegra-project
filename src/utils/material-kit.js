import GlobalDirectives from "@utils/global-directives"
import GlobalMixins from "@utils/global-mixins"
import GlobalComponents from "@utils/global-components"
import VueMaterial from "vue-material"

export default {
  install(Vue) {
    Vue.use(GlobalDirectives)
    Vue.use(GlobalMixins)
    Vue.use(GlobalComponents)
    Vue.use(VueMaterial)

    // change single option
    /* Vue.material.locale.dateFormat = 'dd/MM/yyyy'

    // change multiple options
    Vue.material = {
      ...Vue.material,

      locale: {
        ...Vue.material.locale,

        dateFormat: 'dd/MM/yyyy',
        firstDayOfAWeek: 1
      },

      ripple: true,
      cancel: 'Cancelar',
      confirm: 'Listo'
    } */
  }
}
