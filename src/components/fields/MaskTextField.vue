<template>
  <VTextField
    v-model="internalValue"
    :error-messages="errorMessages"
    v-bind="$attrs"
    @input="onInput"
    @keyup="$emit('keyup', $event)"
    @blur="$emit('blur', $event)"
  />
</template>

<script>
import { masker, tokens } from "./maskit"

export default {
  name: "MaskTextField",
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ""
    },
    errorMessages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      internalValue: this.value || ""
    }
  },
  computed: {
    maskCharacters: function() {
      let mask = this.$attrs.mask
      if (mask) {
        let preMade = null
        switch (mask) {
          case "phone":
            preMade = "(###) ### - ####"
            break
          case "social":
            preMade = "###-##-####"
            break
          default:
            throw Error(`Unknown Mask: ${mask}`)
        }
        return preMade
      }
      return null
    }
  },
  watch: {
    value: {
      handler: function(v) {
        if (this.maskCharacters) {
          this.internalValue = masker(v, this.maskCharacters, true, tokens)
        } else {
          this.internalValue = v
        }
      }
    }
  },
  created: function() {
    // Create initial mask
    if (this.maskCharacters) {
      this.internalValue = masker(
        this.internalValue,
        this.maskCharacters,
        true,
        tokens
      )
    }
  },
  methods: {
    onInput(newValue) {
      this.$nextTick(() => {
        let internalValue = newValue
        let toEmit = newValue

        if (this.maskCharacters) {
          // Enforce mask and prevent more input
          internalValue = masker(newValue, this.maskCharacters, true, tokens)
          toEmit = masker(newValue, this.maskCharacters, false, tokens)
        }

        this.internalValue = internalValue
        this.$emit("input", toEmit)
      })
    }
  }
}
</script>
