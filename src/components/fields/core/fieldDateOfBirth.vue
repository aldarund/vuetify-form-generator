<template>
    <v-menu
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            min-width="290px"
            ref="menu"
    >
        <v-text-field
                v-model="dateFormatted"
                :label="field.label"
                slot="activator"
                :required="field.required"
                readonly
                v-validate="field.validate"
                :disabled="field.disabled"
                :placeholder="field.placeholder"
                :name="field.name"
                @blur="localValue = parseDate(dateFormatted)"
                @change="onChange"
                @focus="onFocus"
                @input="onInput"
        />
        <v-date-picker v-model="localValue" ref="picker" :min="min" :max="max"
                       @change="save"
        >
        </v-date-picker>
    </v-menu>
</template>
<script>
import abstractField from '../abstractField'

export default {
  mixins: [abstractField],
  inject: ['$validator'],
  fieldTypes: ['date_of_birth'],
  data () {
    return {
      menu: false,
      dateFormatted: null
    }
  },
  computed: {
    max () {
      return this.field.min_age ? new Date(new Date().getFullYear() - this.field.min_age, new Date().getMonth(), new Date().getDate()).toISOString().substr(0, 10) : null
    },
    min () {
      return this.field.max_age ? new Date(new Date().getFullYear() - this.field.max_age, new Date().getMonth(), new Date().getDate()).toISOString().substr(0, 10) : null
    }
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
      this.dateFormatted = this.formatDate(date)
      this.onInput()
    },
    formatDate (date) {
      if (!date) {
        return null
      }
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) {
        return null
      }
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
