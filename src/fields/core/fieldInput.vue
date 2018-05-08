<template>
    <v-text-field
            v-model="localValue"
            :label="field.label"
            :required="field.required"
            :readonly="field.editable"
            :disabled="field.disabled"
            :placeholder="field.placeholder"
            :error-messages="errors.collect(field.name)"
            :name="field.name"
            :id="field.name"
            :multi-line="field.field_id === 'multi_line'"
            v-validate="field.validate"
            :data-vv-delay="delay"
            :data-vv-name="field.name"
            :mask="field.mask"
            :type="field.type"
            @blur="onBlur"
            @change="onChange"
            @focus="onFocus"
            @input="onInput"
    />
</template>
<script>
import abstractField from '../abstractField'

export default {
  inject: ['$validator'],
  mixins: [abstractField],
  fieldTypes: ['single_line', 'multi_line', 'unit_field', 'ssn', 'phone', 'email']
}
</script>
