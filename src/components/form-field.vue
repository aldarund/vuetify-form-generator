<template>
  <div>
    <component 
      :is="field.field_id" 
      :field="field" 
      :value="field.value" 
      @upd="onUpd"/>
  </div>
</template>

<script>
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
    field: Object,
    value: null
  },
  methods: {
    onUpd: function(value, fieldName) {
      this.$emit("upd", value, fieldName)
    }
  }
}
</script>
