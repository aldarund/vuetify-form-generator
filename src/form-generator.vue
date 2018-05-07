<template>
    <div>
        <div v-for="section in schema">
            <v-card>
                <v-card-title>{{section.label}}</v-card-title>
                <v-card-text>
                    <div v-for="field in section.fields">
                        <v-form-generator-field :field="field" :value="model[field.model]" @upd="onInput"
                                                v-on:increment="onInput"/>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: 'v-form-generator',
  props: {
    'model': Object,
    'schema': Array,
    'valid': Boolean
  },
  $_veeValidate: { validator: 'new' },
  components: {
    'v-form-generator-field': require('./form-field.vue').default
  },
  data () {
    return {}
  },
  created: function () {
    this.$watch(() => this.$invalid(), (value) => {
      this.$emit('update:valid', !value)
    })
  },
  methods: {
    onBlur: function () {
      console.info('blur')
    },
    onChange: function () {
      console.info('change')
    },
    onFocus: function () {
      console.info('focus')
    },
    onInput: function (value, fieldName) {
      this.model[fieldName] = value
      this.$emit('update:model', this.model)
    }
  }
}
</script>
