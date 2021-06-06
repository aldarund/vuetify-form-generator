<template>
  <AddressField
    :value.sync="item"
    name="street"
    label="Street Address"
    autocomplete="street-address"
    hint="e.g. 141 W Jackson"
    persistent-hint
    validate="required"
    @keyup.enter="$emit('submit')"
    @change="autoCompleteAddress($event)"
  />
</template>
<script>
import abstractField from "../abstractField"
import { ValidationProvider } from "vee-validate"
import MaskTextField from "../MaskTextField"
import AddressField from "../AddressField"

export default {
  components: {
    ValidationProvider,
    MaskTextField,
    AddressField
  },
  mixins: [abstractField],
  fieldTypes: ["street-address"],
  data() {
    return {
      item: null,
      ignoreNextZipAutoComplete: false
    }
  },
  methods: {
    autoCompleteAddress(location) {
      if (location["postalCode"]) {
        // Ignore next ZIP auto-complete from Google
        // Sometimes Google returns a blank City for HERE zips
        this.ignoreNextZipAutoComplete = true
        this.item.zip = location["postalCode"]
        this.item.state = location["state"]
        // Use $set for last so to force re-render
        this.$set(this.item, "city", location["city"])
      }
    }
  }
}
</script>
