<template>
  <div>
    <component
      :is="field.field_id"
      :field="field"
      :scope="scope"
      :value="value"
      @upd="onUpd"/>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions,import/no-unresolved
import * as coreFields from "./fields/core"
let fieldComponents = {}
Object.keys(coreFields).forEach(key => {
  coreFields[key].fieldTypes.forEach(fieldType => {
    fieldComponents[fieldType] = coreFields[key]
  })
})

export default {
  name: "VFormGeneratorField",
  components: fieldComponents,
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Number],
      required: false,
      default: null
    },
    scope: {
      type: String,
      default: null,
      required: false
    }
  },
  methods: {
    onUpd: function(value, fieldName) {
      this.$emit("upd", value, fieldName)
    }
  }
}
</script>
