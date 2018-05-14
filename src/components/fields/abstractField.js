export default {
  props: {
    field: Object,
    value: null
  },
  data () {
    return {
      localValue: this.value,
      delay: 600
    }
  },
  methods: {
    onBlur: function () {
      this.$emit('blur')
    },
    onChange: function () {
      this.$emit('change')
    },
    onFocus: function () {
      this.$emit('focus')
    },
    onInput: function () {
      this.$emit('upd', this.localValue, this.field.name)
    }
  }
}
