<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    v-model="menu"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <v-text-field
      v-validate="field.validate"
      slot="activator"
      v-model="dateFormatted"
      :error="errors.has(veeFieldName)"
      :error-messages="errorMessages"
      :label="field.label"
      :required="field.required"
      :disabled="field.disabled"
      :data-vv-as="field.label"
      :data-vv-scope="scope"
      :placeholder="field.placeholder"
      :name="field.name"
      :ref="field.name"
      readonly
      data-vv-validate-on="input"
      @blur="localValue = parseDate(dateFormatted)"
      @change="onChange"
      @focus="onFocus"
      @input="onInput"
    />
    <v-date-picker
      ref="picker"
      v-model="localValue"
      :min="min"
      :max="max"
      :prepend-icon="field.prependIcon"
      :append-icon="field.appendIcon"
      @change="save"
    />
  </v-menu>
</template>
<script>
import abstractField from "../abstractField"

export default {
  mixins: [abstractField],
  inject: ["$validator"],
  fieldTypes: ["date_of_birth"],
  data() {
    return {
      menu: false,
      dateFormatted: null
    }
  },
  computed: {
    max() {
      return this.field.min_age
        ? new Date(
            new Date().getFullYear() - this.field.min_age,
            new Date().getMonth(),
            new Date().getDate()
          )
            .toISOString()
            .substr(0, 10)
        : null
    },
    min() {
      return this.field.max_age
        ? new Date(
            new Date().getFullYear() - this.field.max_age,
            new Date().getMonth(),
            new Date().getDate()
          )
            .toISOString()
            .substr(0, 10)
        : null
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"))
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
      this.$refs[this.field.name].$emit("input", this.formatDate(date))
    },
    formatDate(date) {
      if (!date) {
        return null
      }
      const [year, month, day] = date.split("-")
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) {
        return null
      }
      const [month, day, year] = date.split("/")
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    }
  }
}
</script>
