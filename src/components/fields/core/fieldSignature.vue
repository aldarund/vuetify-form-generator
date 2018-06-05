<template>
  <div>
    <div v-if="mode === 'graph'">
      <label
        v-if="field.label"
        for="field.name"
        class="v-label">{{ field.label }}</label>
      <vue-signature
        v-validate="field.validate"
        ref="signature"
        class="signature"
        v-model="localValue"
        :data-vv-scope="scope"
        :data-vv-as="field.label"
        :data-vv-name="field.name"
        :sig-option="option"/>
      <div
        v-if="errors.has(veeFieldName)"
        class="v-text-field__details">
        <div class="v-messages error--text">
          <div
            v-for="error in errorMessages"
            :key="error"
            class="v-messages__wrapper">
            <div class="v-messages__message">{{ error }}</div>
          </div>
        </div>
      </div>
      <a @click="typeSignature()" class="switch-signature">Prefer to type your signature? Click here</a>
      <v-btn @click="clear()">clear</v-btn>
    </div>
    <div v-else-if="mode === 'text'">
      <div class="signature-text">{{ textSignature }}</div>
      <v-text-field
        v-validate="field.validate"
        v-model.trim="textSignature"
        :label="field.label"
        :required="field.required"
        :readonly="field.editable"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        :data-vv-as="field.label"
        :data-vv-name="field.name"
        :data-vv-scope="scope"
        :name="field.name"
        :id="field.name"
        :error="errors.has(veeFieldName)"
        :error-messages="errorMessages"
        @input="onTextSignatureInput"
      />
      <a @click="drawSignature()" class="switch-signature">Prefer to draw your signature? Click here</a>
    </div>
  </div>
</template>
<style scoped>
.signature-text {
  font-family: Arizonia, sans-serif;
  font-size: 30px;
}
.v-label {
  position: relative;
  cursor: inherit;
}
.signature {
  border: grey dashed 1px;
}
</style>

<script>
import abstractField from "../abstractField"
import VueSignature from "vue-signature/src/lib/vue-signature"

export default {
  inject: ["$validator"],
  components: {
    "vue-signature": VueSignature
  },
  mixins: [abstractField],
  fieldTypes: ["signature"],
  data() {
    const ratio =  1.5
    return {
      mode: "graph",
      textSignature: null,
      option: {
        onEnd: () => {
          return this.save()
        }
      }
    }
  },
  methods: {
    save() {
      let sign = this.$refs.signature.save()
      this.$emit("upd", sign, this.field.name)
    },
    onTextSignatureInput() {
      this.$emit("upd", this.textSignature, this.field.name)
    },
    typeSignature() {
      this.mode = "text"
      this.onTextSignatureInput()
    },
    drawSignature() {
      this.mode = "graph"
      this.save()
    },
    clear() {
      this.$refs.signature.clear()
      this.$emit("upd", "", this.field.name)
    }
  }
}
</script>