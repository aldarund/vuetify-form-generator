<template>
  <div class="v-display-form">
    <div
      v-for="(section, index) in form.sections"
      :key="`vf-${index}`">
      <v-card flat>
        <v-card-title>{{ section.label }}</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout
              v-for="field in section.fields"
              :key="field.name"
              row
              wrap
              pb-2
              pt-2>
              <template v-if="field.field_id === 'signature'">
                <v-flex
                  v-if="field.value.indexOf('data:image') !== -1"
                  xs12>
                  <img :src="field.value">
                </v-flex>
                <v-flex
                  v-else
                  class="signature-text">
                  <strong>
                    {{ field.value }}
                  </strong>
                </v-flex>
              </template>
              <template v-else-if="field.field_id === 'text_display'">
                <v-flex
                  xs12
                  sm6
                  class="headline"
                  v-html="field.label"/>
              </template>
              <template v-else-if="['choice', 'state', 'combobox'].indexOf(field.field_id) !== -1">
                <v-flex
                  xs12
                  sm6>
                  {{ field.label }}
                </v-flex>
                <v-flex
                  xs12
                  sm6>
                  <strong>
                    {{ getChoiceValue(field) }}
                  </strong>
                </v-flex>
              </template>
              <template v-else>
                <v-flex
                  xs12
                  sm6>
                  {{ field.label }}
                </v-flex>
                <v-flex
                  xs12
                  sm6>
                  <strong>
                    {{ field.value }}
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
.signature-text {
  font-family: Arizonia, sans-serif;
  font-size: 30px;
}

.v-display-form .layout.row:nth-child(2n) {
  background-color: #f6f6f6;
}
</style>

<script>
export default {
  name: "VuetifyDisplayForm",
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    getChoiceValue(field) {
      const choice = field.choices.find(labelValue => {
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
