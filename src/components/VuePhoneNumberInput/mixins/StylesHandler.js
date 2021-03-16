export default {
  props: {
    theme: { type: Object, required: true }
  },
  computed: {
    labelColorStyle() {
      if (this.error) return this.theme.errorColor
      else if (this.valid) return this.theme.validColor
      else if (this.isFocus) return this.theme.color
      else if (this.dark) return this.theme.textDarkColor
      return null
    },
    inputBgColor() {
      return !this.dark ? null : this.theme.bgDarkColor
    },
    textColor() {
      return this.dark ? this.theme.textDarkColor : null
    },
    inputCaretStyle() {
      return { caretColor: this.theme.colorValue }
    }
  }
}
