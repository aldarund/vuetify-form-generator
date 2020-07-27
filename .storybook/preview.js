import { configure, addDecorator } from '@storybook/vue';
import Vue from 'vue';

import vuetifyConfig from '../src/plugins/vuetify'

// Import your custom components.
import ModuleLibrary from '@/index';


// Install this library
Vue.use(ModuleLibrary);
// Install Vue plugins
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, { inject: false });


// Ensures every story is wrapped in a v-app tag
addDecorator(() => ({
  vuetify: vuetifyConfig,
  template: "<v-app><story/></v-app>"
}))


// Load stories
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
