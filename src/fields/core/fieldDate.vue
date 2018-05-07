<template>
    <v-menu
            lazy
            :close-on-content-click="true"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
    >
        <v-text-field
                v-model="dateFormatted"
                :label="field.label"
                slot="activator"
                :required="field.required"
                readonly
                :disabled="field.disabled"
                :placeholder="field.placeholder"
                @blur="localValue = parseDate(dateFormatted)"
                @change="onChange"
                @focus="onFocus"
                @input="onInput"
        />
        <v-date-picker v-model="localValue" @input="setDate($event)" no-title scrollable
                       actions>
            <template slot-scope="{ save, cancel }">
                <v-card-actions>
                    <v-spacer/>
                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                    <v-btn flat color="primary" @click="save">OK</v-btn>
                </v-card-actions>
            </template>
        </v-date-picker>
    </v-menu>
</template>
<script>
import abstractField from '../abstractField'
//  TOOD fix field. not very usable
export default {
  mixins: [abstractField],
  fieldTypes: ['date'],
  data () {
    return {
      menu: false,
      dateFormatted: null
    }
  },
  methods: {
    setDate (date) {
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
