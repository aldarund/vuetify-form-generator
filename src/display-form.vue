<template>
    <div class="v-display-form">
        <div v-for="section in form.sections">
            <v-card>
                <v-card-title>{{section.label}}</v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout v-for="field in section.fields" row wrap :key="field.name" pb-2 pt-2>
                            <template v-if="field.field_id === 'signature'">
                                <v-flex xs12 v-if="field.value.indexOf('data:image') !== -1">
                                    <img :src="field.value">
                                </v-flex>
                                <v-flex class="signature-text" v-else>
                                    <strong>
                                        {{field.value}}
                                    </strong>
                                </v-flex>
                            </template>
                            <template v-else-if="field.field_id === 'text_display'">
                                <v-flex xs12 sm6 v-html="field.label" class="headline">
                                </v-flex>
                            </template>
                            <template v-else-if="['choice', 'state', 'combobox'].indexOf(field.field_id) !== -1">
                                <v-flex xs12 sm6>
                                    {{field.label}}
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <strong>
                                        {{getChoiceValue(field)}}
                                    </strong>
                                </v-flex>
                            </template>
                            <template v-else>
                                <v-flex xs12 sm6>
                                    {{field.label}}
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <strong>
                                        {{field.value}}
                                    </strong>
                                </v-flex>
                            </template>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>
<style scoped>
    @font-face {
        font-family: 'Quentin';
        src: url('./assets/fonts/Quentin.woff2') format('woff2'),
        url('./assets/fonts/Quentin.woff') format('woff');
        font-weight: bold;
        font-style: normal;
    }

    .signature-text {
        font-family: Quentin, sans-serif;
        font-size: 30px;
    }

    .v-display-form .layout.row:nth-child(2n) {
        background-color: #f6f6f6
    }

</style>

<script>
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
        const choice = field.choices.find((labelValue) => {
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
