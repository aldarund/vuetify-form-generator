<template>
  <v-select
    :id="field.name"
    v-model="localValue"
    v-validate="field.required && 'required'"
    :items="field.choices"
    :label="field.label"
    :required="field.required"
    :readonly="field.readonly"
    :autocomplete="field.autocomplete"
    :disabled="field.disabled"
    :error="errors.has(veeFieldName)"
    :error-messages="errorMessages"
    :name="field.name"
    :data-vv-delay="field.delay"
    :data-vv-as="field.label"
    :data-vv-name="field.name"
    :data-vv-scope="scope"
    :prepend-icon="field.prependIcon"
    :append-icon="field.appendIcon"
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
  fieldTypes: ["choice"]
}
</script>
