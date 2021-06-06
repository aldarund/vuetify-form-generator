import VuetifyFormGenerator from "./components/form-generator"
import VuetifyDisplayForm from "./components/display-form"
import FocusableField from "./components/fields/FocusableField"
import AddressField from "./components/fields/AddressField"

const LibraryModule = {
  VuetifyFormGenerator,
  VuetifyDisplayForm,
  install(Vue) {
    // Register components with vue
    Vue.component("VuetifyFormGenerator", VuetifyFormGenerator)
    Vue.component("VuetifyDisplayForm", VuetifyDisplayForm)
    Vue.component("FocusableField", FocusableField)
    Vue.component("AddressField", AddressField)
  }
}
export default LibraryModule
export { VuetifyFormGenerator, VuetifyDisplayForm }
