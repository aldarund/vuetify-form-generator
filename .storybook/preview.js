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
  regex,
  digits
} from 'vee-validate/dist/rules.umd'

// Import your custom components.
import ModuleLibrary from '@/index';


// Install this library
Vue.use(ModuleLibrary);
// Install Vue plugins
extend('min_letter', {
  validate: (value, { length }) =>
    (value.match(/[a-z]/gi) || []).length >= length,
  params: ['length'],
  message: (_, { length }) => `This must contain at least ${length} letters`
})
extend('min_digit', {
  validate: (value, { length }) => (value.match(/\d/g) || []).length >= length,
  params: ['length'],
  message: (_, { length }) => `This must contain at least ${length} digits`
})
extend('sm_street', {
  validate: value => /^[A-Z\d\s£.`]*$/i.test(value),
  message: () =>
    `This special characters allowed are apostrophe, pound sign, period, and space`
})
extend('sm_city', {
  validate: value => /^[A-Z\s.\- ']*$/i.test(value),
  message: () =>
    `This field can only contain letters, spaces, periods, single quotes, hyphens`
})
extend('sm_name', {
  validate: value => /^[A-Z\s.\-,']*$/i.test(value),
  message: () =>
    `This field can only contain letters, spaces, periods, single quotes, hyphens, comma, period`
})
extend('zip', {
  validate: value => /^\d{5}?$/i.test(value),
  message: () => `Zip Code can only be in the format 00000`
})
extend('full_name', {
  validate: value => /([a-zA-Z]+){2,50} ([a-zA-Z]+){2,50}$/i.test(value),
  message: () => `This should be a legal full name`
})
extend('password', {
  validate: value => {
    const valid_password_length = value.length >= 8
    const contains_lowercase = /[a-z]/.test(value)
    const contains_number = /\d/.test(value)
    const contains_uppercase = /[A-Z]/.test(value)
    return (
      contains_lowercase &&
      contains_number &&
      contains_uppercase &&
      valid_password_length
    )
  },
  message: () => `This should meet all password requirements`
})

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('numeric', numeric)
extend('digits', digits)
extend('regex', regex)

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
