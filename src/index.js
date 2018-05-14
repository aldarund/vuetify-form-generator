import VuetifyFormGenerator from "./components/form-generator"
import VuetifyDisplayForm from "./components/display-form"

const LibraryModule = {
  VuetifyFormGenerator,
  VuetifyDisplayForm,
  install(Vue) {
    // Register components with vue
    Vue.component("VuetifyFormGenerator", VuetifyFormGenerator)
    Vue.component("VuetifyDisplayForm", VuetifyDisplayForm)
  }
}
export default LibraryModule
export { VuetifyFormGenerator, VuetifyDisplayForm }
