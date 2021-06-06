<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="field.name"
    :debounce="field.delay"
    :name="field.label"
    :rules="field.validate"
  >
    <MaskTextField
      :id="field.name"
      v-model.trim="localValue"
      :label="field.label"
      :autocomplete="field.autocomplete"
      :required="field.required"
      :maxlength="field.maxlength"
      :readonly="field.editable"
      :disabled="field.disabled"
      :placeholder="field.placeholder"
      :name="field.name"
      :error="errors.length > 0"
      :error-messages="errors"
      :multi-line="field.field_id === 'multi_line'"
      :prepend-icon="field.prependIcon"
      :prepend-inner-icon="field.prependInnerIcon"
      :append-icon="field.appendIcon"
      :mask="field.mask"
      :type="field.type"
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
import MaskTextField from "../MaskTextField"

export default {
  components: {
    ValidationProvider,
    MaskTextField
  },
  mixins: [abstractField],
  fieldTypes: [
    "single_line",
    "multi_line",
    "unit_field",
    "ssn",
    "phone",
    "email"
  ]
}
</script>
