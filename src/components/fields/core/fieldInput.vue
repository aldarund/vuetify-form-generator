<template>
  <v-text-field
    v-validate="field.validate"
    v-model.trim="localValue"
    :label="field.label"
    :autocomplete="field.autocomplete"
    :required="field.required"
    :maxlength="field.maxlength"
    :readonly="field.editable"
    :disabled="field.disabled"
    :placeholder="field.placeholder"
    :name="field.name"
    :id="field.name"
    :error="errors.has(veeFieldName)"
    :error-messages="errorMessages"
    :multi-line="field.field_id === 'multi_line'"
    :data-vv-delay="field.delay"
    :data-vv-as="field.label"
    :data-vv-name="field.name"
    :data-vv-scope="scope"
    :prepend-icon="field.prependIcon"
    :append-icon="field.appendIcon"
    :mask="field.mask"
    :type="field.type"
    data-vv-validate-on="blur"
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
