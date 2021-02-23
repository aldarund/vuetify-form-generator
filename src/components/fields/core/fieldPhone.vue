<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="field.name"
    :debounce="field.delay"
    :name="field.label"
    :rules="field.validate"
  >
    <div>
      <VuePhoneNumberInput
        :id="field.name"
        v-model.trim="localValue"
        :border-radius="0"
        :error="errors.length > 0"
        error-color="#ff5252"
        default-country-code="US"
        @input="onInput"
        @phone-number-focused="onFocus"
        @phone-number-blur="onBlur"
      />

      <div v-text="errors[0]" />
    </div>
  </ValidationProvider>
</template>
<script>
import abstractField from "../abstractField"
import { ValidationProvider } from "vee-validate"
import VuePhoneNumberInput from "../../VuePhoneNumberInput"

export default {
  components: {
    ValidationProvider,
    VuePhoneNumberInput
  },
  mixins: [abstractField],
  fieldTypes: ["phone"]
}
</script>
