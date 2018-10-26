<template>
  <div>
    <component
      :is="field.field_id"
      :field="field"
      :scope="scope"
      :value="value"
      @upd="onUpd"
    />
  </div>
</template>

<script>
const requireComponent = require.context(
  "./fields/core",
  false,
  /field[\w-]+\.vue$/
)
const fieldComponents = {}

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  componentConfig.default.fieldTypes.forEach(fieldType => {
    fieldComponents[fieldType] = componentConfig.default
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
