<template>
  <div
    :id="id"
    :class="[{ dark: dark }, size]"
    class="vue-phone-number-input d-flex"
  >
    <div class="select-country-container">
      <CountrySelector
        :id="`${uniqueId}_country_selector`"
        ref="CountrySelector"
        v-model="countryCode"
        :items="codesCountries"
        :countries-height="countriesHeight"
        :error="shouldChooseCountry"
        :hint="shouldChooseCountry ? t.countrySelectorError : null"
        :disabled="disabled"
        :valid="isValid"
        :preferred-countries="preferredCountries"
        :only-countries="onlyCountries"
        :ignored-countries="ignoredCountries"
        :label="t.countrySelectorLabel"
        :show-code-on-list="showCodeOnList"
        :size="size"
        :dark="dark"
        :theme="theme"
        class="input-country-selector"
        @input="handleInput1"
      >
        <slot slot="arrow"
name="arrow" />
      </CountrySelector>
    </div>

    <div class="flex-1">
      <InputTel
        :id="`${uniqueId}_phone_number`"
        ref="PhoneNumberInput"
        v-model="phoneNumber"
        :label="t.phoneNumberLabel"
        :hint="hintValue"
        :dark="dark"
        :disabled="disabled"
        :size="size"
        :error="error"
        :valid="isValid"
        :required="required"
        v-bind="$attrs"
        :theme="theme"
        class="input-phone-number"
        @keydown="
          e => {
            lastKeyPressed = e.keyCode
          }
        "
        @focus="$emit('phone-number-focused')"
        @blur="$emit('phone-number-blur')"
        @input="handleInput2"
      />
    </div>
  </div>
</template>
<script>
import { countries, countriesIso } from "./assets/js/phoneCodeCountries.js"

import InputTel from "./InputTel"
import CountrySelector from "./CountrySelector"
import locales from "./assets/locales"

const isCountryAvailable = locale => {
  if (!locale) return false
  return countriesIso.includes(locale)
}

function parsePhoneNumberFromString(phoneNumber, countryCode) {
  return {
    countryCallingCode: countryCode,
    nationalNumber: phoneNumber
  }
}

export default {
  name: "MazPhoneNumberInput",
  components: {
    InputTel,
    CountrySelector
  },
  props: {
    value: { type: [String, Number], default: null },
    id: { type: String, default: "MazPhoneNumberInput" },
    color: { type: String, default: "dodgerblue" },
    validColor: { type: String, default: "yellowgreen" },
    errorColor: { type: String, default: "orangered" },
    darkColor: { type: String, default: "#424242" },
    disabled: { type: Boolean, default: false },
    defaultCountryCode: { type: String, default: null },
    size: { type: String, default: null },
    preferredCountries: { type: Array, default: null },
    onlyCountries: { type: Array, default: null },
    ignoredCountries: { type: Array, default: Array },
    translations: { type: Object, default: null },
    error: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    countriesHeight: { type: Number, default: 30 },
    noUseBrowserLocale: { type: Boolean, default: false },
    showCodeOnList: { type: Boolean, default: false },
    dark: { type: Boolean, default: false }
  },
  data() {
    return {
      results: {},
      userLocale: this.defaultCountryCode,
      countryCode: this.defaultCountryCode,
      phoneNumber: null,
      lastKeyPressed: null
    }
  },
  computed: {
    uniqueId() {
      return `${this.id}-${this._uid}`
    },
    t() {
      return {
        ...locales,
        ...this.translations
      }
    },
    codesCountries() {
      return countries
    },
    shouldChooseCountry() {
      return !this.countryCode && !!this.phoneNumber
    },

    isValid() {
      return this.results.isValid
    },
    hintValue() {
      return null
    },
    theme() {
      return {
        colorValue: this.color,
        color: { color: this.color },
        textColor: { color: "#747474" },
        textDarkColor: { color: "rgba(255, 255, 255, 0.7)" },
        validColor: { color: this.validColor },
        errorColor: { color: this.errorColor },
        darkColor: { color: this.darkColor },
        bgColor: { backgroundColor: this.color },
        bgValidColor: { backgroundColor: this.validColor },
        bgErrorColor: { backgroundColor: this.errorColor },
        bgDarkColor: { backgroundColor: this.darkColor },
        borderColor: { borderColor: this.color },
        borderValidColor: { borderColor: this.validColor },
        borderErrorColor: { borderColor: this.errorColor },
        borderDarkColor: { borderColor: this.darkColor }
      }
    }
  },
  watch: {
    defaultCountryCode(newValue, oldValue) {
      if (newValue === oldValue) return
      this.setLocale(newValue)
    }
  },
  async mounted() {
    try {
      if (this.value) {
        const phoneNumber = parsePhoneNumberFromString("+" + this.value)

        this.countryCode = phoneNumber["country"]
        this.phoneNumber = phoneNumber["nationalNumber"]

        this.emitValues({
          countryCode: this.countryCode,
          phoneNumber: this.phoneNumber
        })
      } else {
        this.countryCode = this.defaultCountryCode
      }

      if (this.defaultCountryCode && this.noUseBrowserLocale) {
        throw new Error(
          'MazPhoneNumberInput: If you use a "default-country-code", do not use "no-use-browser-locale" options'
        )
      }
    } catch (err) {
      throw new Error(err)
    }
  },
  methods: {
    getParsePhoneNumberFromString({ phoneNumber, countryCode }) {
      const parsing =
        phoneNumber && countryCode
          ? parsePhoneNumberFromString(phoneNumber, countryCode)
          : null

      return {
        countryCode: countryCode,
        isValid: false,
        ...(phoneNumber && phoneNumber !== ""
          ? { phoneNumber: phoneNumber }
          : null),
        ...(parsing
          ? {
              formattedNumber: parsing.number,
              nationalNumber: parsing.nationalNumber,
              isValid: true
            }
          : null)
      }
    },
    emitValues(payload) {
      // console.group(`emitValues`)
      // console.log(payload)
      // // const p = payload["phoneNumber"]
      //
      // this.$nextTick(() => {

      this.results = this.getParsePhoneNumberFromString(payload)
      console.log(this.results)
      const phoneNumber =
        this.results["countryCode"] + this.results["nationalNumber"]

      this.$emit("input", phoneNumber)

      // })
      // console.groupEnd('emitV33444')
    },
    setLocale(locale) {
      const countryAvailable = isCountryAvailable(locale)
      if (countryAvailable) {
        this.emitValues({ countryCode: locale, phoneNumber: this.phoneNumber })
      } else {
        window.console.warn(`The locale ${locale} is not available`)
      }
    },
    handleInput1(x) {
      this.emitValues({ countryCode: x, phoneNumber: this.phoneNumber })
    },
    handleInput2(x) {
      this.emitValues({ countryCode: this.countryCode, phoneNumber: x })
    }
  }
}
</script>
<style lang="scss" scoped>
.flex-1 {
  flex: 1;
}

.vue-phone-number-input {
  .select-country-container {
    flex: 0 0 120px;
    width: 120px;
    min-width: 120px;
    max-width: 120px;
  }

  &.sm .select-country-container {
    flex: 0 0 110px;
    width: 110px;
    min-width: 110px;
    max-width: 110px;
  }

  &.lg .select-country-container {
    flex: 0 0 130px;
    width: 130px;
    min-width: 130px;
    max-width: 130px;
  }
}
</style>
