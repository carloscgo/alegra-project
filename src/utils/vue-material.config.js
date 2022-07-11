/* istanbul ignore file */

import Vue from 'vue'

// change single option
Vue.material.locale.dateFormat = 'dd/MM/yyyy'

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
}
