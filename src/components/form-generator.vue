<template>
  <v-form class="v-form-generator">
    <div
      v-for="(section, index) in schema"
      :key="`vf-${index}`">
      <v-card flat>
        <v-card-title>{{ section.label }}</v-card-title>
        <v-card-text>
          <div
            v-for="field in section.fields"
            :key="field.name">
            <v-form-generator-field
              :field="field"
              :value="model[field.name] || field.value"
              :scope="validationScope"
              @upd="onInput"/>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-form>
</template>

<script>
import formField from "./form-field"

export default {
  name: "VuetifyFormGenerator",
  components: {
    "v-form-generator-field": formField
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    schema: {
      type: Array,
      required: true
    },
    valid: {
      type: Boolean,
      default: false
    },
    validationScope: {
      type: String,
      default: null,
      required: false
    }
  },
  inject: {
    $validator: { default: false }
  },
  $_veeValidate: { validator: "new" },
  data() {
    return {}
  },
  created: function() {
    this.$watch(
      () => this.$invalid(),
      value => {
        this.$emit("update:valid", !value)
      }
    )
  },
  methods: {
    onBlur: function() {
      // console.info("blur")
    },
    onChange: function() {
      // console.info("change")
    },
    onFocus: function() {
      // console.info("focus")
    },
    onInput: function(value, fieldName) {
      this.$set(this.model, fieldName, value)
      this.$emit("update:model", this.model)
    }
  }
}
</script>
