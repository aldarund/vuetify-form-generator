<template>
  <v-select
    v-validate="field.required && 'required'"
    v-model="localValue"
    :items="field.choices"
    :combobox="combobox"
    :autocomplete="field.autocomplete"
    :chips="combobox"
    :label="field.label"
    :required="field.required"
    :readonly="field.readonly"
    :disabled="field.disabled"
    :error-messages="errors.collect(field.name)"
    :name="field.name"
    :data-vv-delay="delay"
    :data-vv-name="field.name"
    :id="field.name"
    item-text="label"
    item-value="value"
    @blur="onBlur"
    @change="onChange"
    @focus="onFocus"
    @input="onInput"
  />
</template>
<script>
import abstractField from "../abstractField"

export default {
  inject: ["$validator"],
  mixins: [abstractField],
  fieldTypes: ["choice", "state", "combobox"],
  data() {
    return {
      combobox: this.field.field_id === "combobox"
    }
  },
  methods: {}
}
</script>
