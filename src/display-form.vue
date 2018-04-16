<template>
    <div>
        <div v-for="section in form.sections">
            <v-card>
                <v-card-title>{{section.label}}</v-card-title>
                <div v-for="field in section.fields">
                    <div v-if="field.field_id === 'signature'">
                        <span  v-if="field.value.indexOf('data:image') !== -1">
                          <img :src="field.value">
                        </span>
                        <span class="signature-text" v-else>
                          {{field.value}}
                        </span>
                    </div>
                    <div v-else-if="field.field_id === 'text_display'">
                       <span v-html="field.label"></span>
                    </div>
                    <div v-else-if="['choice', 'state', 'combobox'].indexOf(field.field_id) !== -1">
                        {{getChoiceValue(field)}}
                    </div>
                    <div v-else>
                        {{field.value}}
                    </div>
                </div>
            </v-card>
        </div>
    </div>
</template>


<script>
  import { find } from 'lodash'

  export default {
    name: 'v-display-application',
    props: {
      form: Object
    },
    data () {
      return {}
    },
    methods: {
      getChoiceValue (field) {
        const choice = find(field.choices, (labelValue) => {
          return field.value === labelValue.value
        })
        if (choice) {
          return choice.label
        } else {
          return field.value
        }
      }
    }
  }
</script>
<style scoped>
    @font-face {
        font-family: 'Quentin';
        src: url('assets/fonts/Quentin.woff2') format('woff2'),
        url('assets/fonts/Quentin.woff') format('woff');
        font-weight: bold;
        font-style: normal;
    }

    .signature-text {
        font-family: Quentin, sans-serif;
        font-size: 30px;
    }
</style>
