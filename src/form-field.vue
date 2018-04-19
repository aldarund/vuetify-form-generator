<template>
    <div>
        <component :is="field.field_id" :field="field" :value="field.value" v-on:upd="onUpd"/>
    </div>
</template>

<script>
  let fieldComponents = {}
  let coreFields = require.context('./fields/core', false, /^\.\/field([\w-_]+)\.vue$/)
  coreFields.keys().forEach((key) => {
    coreFields(key).default.fieldTypes.forEach((fieldType) => {
      fieldComponents[fieldType] = coreFields(key).default
    })
  })

  export default {
    name: 'v-form-generator-field',
    components: fieldComponents,
    props: {
      field: Object,
      value: null
    },
    methods: {
      onUpd: function (value, fieldName) {
        this.$emit('upd', value, fieldName)
      }
    }
  }
</script>
