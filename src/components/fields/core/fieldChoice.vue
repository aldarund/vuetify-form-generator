<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="field.name"
    :debounce="field.delay"
    :name="field.label"
    :rules="field.required && 'required'"
  >
    <v-select
      :id="field.name"
      v-model="localValue"
      :items="field.choices"
      :label="field.label"
      :required="field.required"
      :readonly="field.readonly"
      :autocomplete="field.autocomplete"
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
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  },
  mixins: [abstractField],
  fieldTypes: ["choice"]
}
</script>
