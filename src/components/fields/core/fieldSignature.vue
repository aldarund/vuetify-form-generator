<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="field.name"
    :name="field.label"
    :rules="field.validate"
  >
    <div v-if="mode === 'graph'">
      <label v-if="field.label" for="field.name" class="v-label">{{field.label }}</label>
      <vue-signature
        ref="signature"
        v-model="localValue"
        class="signature"
        :sig-option="option"
      />
      <div v-if="errors.length > 0" class="v-text-field__details">
        <div class="v-messages error--text">
          <div v-for="error in errors" :key="error" class="v-messages__wrapper">
            <div class="v-messages__message">
              {{ error }}
            </div>
          </div>
        </div>
      </div>
      <a class="switch-signature" @click="typeSignature()">Prefer to type your signature? Click here</a>
      <v-btn @click="clear()">
        clear
      </v-btn>
    </div>
    <div v-else-if="mode === 'text'">
      <div class="signature-text">
        {{ textSignature }}
      </div>
      <v-text-field
        :id="field.name"
        v-model.trim="textSignature"
        :label="field.label"
        :required="field.required"
        :readonly="field.editable"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        :name="field.name"
        :error="errors.length > 0"
        :error-messages="errors"
        @input="onTextSignatureInput"
      />
      <a class="switch-signature" @click="drawSignature()">Prefer to draw your signature? Click here</a>
    </div>
  </ValidationProvider>
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
import VueSignature from "vue-signature/src/components/vueSignature"
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    "vue-signature": VueSignature
  },
  mixins: [abstractField],
  fieldTypes: ["signature"],
  data() {
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
      if (this.$refs.signature) {
        let sign = this.$refs.signature.save()
        this.$emit("upd", sign, this.field.name)
      }
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
