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
    }
  },
  data() {
    return {
      localValue: this.value || null,
      delay: 600
    }
  },
  mounted: function() {
    this.onInput()
  },
  watch: {
    value: {
      handler: function(v) {
        this.localValue = v
      }
    }
  },
  computed: {},
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
