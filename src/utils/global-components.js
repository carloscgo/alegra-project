/* istanbul ignore file */

import DropDown from "@components/drop-down.vue"
import Modal from "@components/modal.vue"
import Parallax from "@components/parallax.vue"
import { VPopover } from "v-tooltip"
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component('drop-down', DropDown)
    Vue.component('modal', Modal)
    Vue.component('parallax', Parallax)
    Vue.component("v-popover", VPopover)
  }
}

export default GlobalComponents
