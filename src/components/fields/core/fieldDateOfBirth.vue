<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <ValidationProvider
        v-slot="{ errors }"
        :vid="field.name"
        :name="field.label"
        :rules="field.validate"
      >
        <v-text-field
          :ref="field.name"
          v-model="dateFormatted"
          :error="errors.length > 0"
          :error-messages="errors"
          :label="field.label"
          :required="field.required"
          :disabled="field.disabled"
          :placeholder="field.placeholder"
          :name="field.name"
          readonly
          v-on="on"
          @blur="localValue = parseDate(dateFormatted)"
          @change="onChange"
          @focus="onFocus"
          @input="onInput"
        />
      </ValidationProvider>
    </template>
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
import { ValidationProvider } from "vee-validate"

export default {
  components: {
    ValidationProvider
  },
  mixins: [abstractField],
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
