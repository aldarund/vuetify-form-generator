export default {
  props: {
    field: Object,
    value: null
  },
  data() {
    return {
      localValue: this.value,
      delay: 600
    }
  },
  computed: {
    veeFieldName() {
      // if (this.scope) {
      //   return `${this.scope}.${this.field.name}`;
      // } else {
      //   return this.field.name;
      // }
      return this.field.name
    },
    veeField() {
      // if (this.scope) {
      //   return (this.fields[`$` + this.scope] || {})[this.name];
      // } else {
      //   return this.fields[this.field.name];
      // }
      return this.fields[this.field.name]
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
