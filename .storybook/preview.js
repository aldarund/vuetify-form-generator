import { configure, addDecorator } from '@storybook/vue';
import Vue from 'vue';

import vuetifyConfig from '../src/plugins/vuetify'
import { ValidationProvider, extend } from 'vee-validate';
import {
  required,
  email,
  min,
  max,
  numeric,
  digits,
} from 'vee-validate/dist/rules.umd'

// Import your custom components.
import ModuleLibrary from '@/index';


// Install this library
Vue.use(ModuleLibrary);
// Install Vue plugins
extend('required', required)
extend('email', email)
extend('digits', digits)
extend('numeric', numeric)
extend('max', max)
extend('min', min)

Vue.component('ValidationProvider', ValidationProvider);

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
