import { configure } from '@storybook/vue';
import Vue from 'vue';
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
  VForm ,
  VAutocomplete,
  VTextField,
  VMenu,
  VDatePicker,
  VCardActions,
  VSpacer,
  VSelect
} from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

// Import your custom components.
import ModuleLibrary from '@/index';

// Install this library
Vue.use(ModuleLibrary);

// Install Vue plugins
Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
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

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, { inject: false });


// Load stories
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
