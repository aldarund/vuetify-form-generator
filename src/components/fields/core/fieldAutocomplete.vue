<template>
  <v-autocomplete
    v-validate="field.required && 'required'"
    v-model="localValue"
    :items="field.choices"
    :combobox="combobox"
    :chips="combobox"
    :label="field.label"
    :required="field.required"
    :readonly="field.readonly"
    :disabled="field.disabled"
    :error="errors.has(veeFieldName)"
    :error-messages="errorMessages"
    :name="field.name"
    :data-vv-delay="field.delay"
    :data-vv-as="field.label"
    :data-vv-name="field.name"
    :data-vv-scope="scope"
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
  fieldTypes: ["autocomplete", "combobox"],
  data() {
    return {
      combobox: this.field.field_id === "combobox"
    }
  }
}
</script>
