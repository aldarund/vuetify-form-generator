export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      default: null,
      required: false
    },
    scope: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      localValue: this.value,
      delay: 600
    }
  },
  mounted: function() {
    this.onInput()
  },
  watch: {
    'value': {
      handler: function(v) {
        console.log('v1', v)
        this.localValue = v
      }
    }
  },
  computed: {
    veeFieldName() {
      if (this.scope) {
        return `${this.scope}.${this.field.name}`
      } else {
        return this.field.name
      }
    },
    errorMessages() {
      return this.veeField &&
        (this.veeField.dirty || this.veeField.validated) &&
        this.errors.has(this.veeFieldName)
        ? this.errors.collect(this.field.name)
        : undefined
    },
    veeField() {
      if (this.scope) {
        return (this.fields[`$` + this.scope] || {})[this.field.name]
      } else {
        return this.fields[this.field.name]
      }
    }
  },
  methods: {
    onBlur: function() {
      this.$emit("blur")
    },
    onChange: function() {
      this.$emit("change")
    },
    onFocus: function() {
      this.$emit("focus")
    },
    onInput: function() {
      this.$emit("upd", this.localValue, this.field.name)
    }
  }
}
