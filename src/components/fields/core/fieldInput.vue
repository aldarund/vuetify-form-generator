<template>
  <v-text-field
    v-validate="field.validate"
    v-model.trim="localValue"
    :label="field.label"
    :required="field.required"
    :readonly="field.editable"
    :disabled="field.disabled"
    :placeholder="field.placeholder"
    :name="field.name"
    :id="field.name"
    :error="errors.has(field.name)"
    :error-messages="fields[field.name] && fields[field.name].dirty && errors.has(field.name) ? errors.collect(field.name) : undefined"
    :multi-line="field.field_id === 'multi_line'"
    :data-vv-delay="delay"
    :data-vv-name="field.name"
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
