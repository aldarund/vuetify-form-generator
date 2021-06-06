<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="field.name"
    :debounce="field.delay"
    :name="field.label"
    :rules="field.required && 'required'"
  >
    <v-autocomplete
      :id="field.name"
      v-model="localValue"
      :items="field.choices"
      :combobox="combobox"
      :chips="combobox"
      :label="field.label"
      :autocomplete="field.autocomplete"
      :required="field.required"
      :readonly="field.readonly"
      :disabled="field.disabled"
      :error="errors.length > 0"
      :error-messages="errors"
      :name="field.name"
      :prepend-icon="field.prependIcon"
      :append-icon="field.appendIcon"
      item-text="label"
      item-value="value"
      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"
      @input="onInput"
    />
  </ValidationProvider>
</template>
<script>
import abstractField from "../abstractField"
import { ValidationProvider } from "vee-validate"

export default {
  components: {
    ValidationProvider
  },
  mixins: [abstractField],
  fieldTypes: ["autocomplete", "combobox"],
  data() {
    return {
      combobox: this.field.field_id === "combobox"
    }
  }
}
</script>
