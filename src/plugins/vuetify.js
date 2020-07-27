import Vue from "vue"
import Vuetify, {
  VApp,
  VBtn,
  VCard,
  VCardTitle,
  VCardText,
  VContainer,
  VFlex,
  VHover,
  VIcon,
  VLayout,
  VTooltip,
  VForm,
  VAutocomplete,
  VTextField,
  VMenu,
  VDatePicker,
  VCardActions,
  VSpacer,
  VSelect
} from "vuetify/lib"
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VCard,
    VCardTitle,
    VCardText,
    VContainer,
    VFlex,
    VHover,
    VIcon,
    VLayout,
    VTooltip,
    VForm,
    VAutocomplete,
    VTextField,
    VMenu,
    VDatePicker,
    VCardActions,
    VSpacer,
    VSelect
  }
})

const opts = {
  theme: {
    dark: false
  }
}

export default new Vuetify(opts)
