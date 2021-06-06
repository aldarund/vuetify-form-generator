<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors }"
    name="name"
    :rules="validate"
    :detect-input="false"
  >
    <VAutocomplete
      v-model="selectedSuggestion"
      :error-messages="errors"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      v-bind="$attrs"
      item-text="label"
      item-value="locationId"
      hide-no-data
      no-filter
      return-object
      autocomplete="street-address"
      @input="handleInput($event)"
      @keyup="$emit('keyup', $event)"
      @blur="handleBlur($event)"
      @change="handleChange($event)"
      @focus="$emit('focus', $event)"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate"

export default {
  name: "AddressField",
  components: { ValidationProvider },
  props: {
    value: {
      type: String,
      default: ""
    },
    validate: {
      type: String,
      default: ""
    }
  },
  data() {
    let items = []
    // Preview initial value
    if (this.value) {
      items.push({
        label: this.value,
        locationId: this.value,
        street: this.value,
        city: null,
        postalCode: null,
        state: null
      })
    }
    return {
      locationId: this.value,
      selectedSuggestion: this.value,
      select: null,
      loading: false,
      items: items,
      search: null
    }
  },
  watch: {
    search(val) {
      if (val && val !== this.select) {
        // cancel pending call
        clearTimeout(this._timerId)

        // delay new call 500ms
        this._timerId = setTimeout(() => {
          this.querySelections(val)
        }, 600)
      }
    }
  },
  methods: {
    async querySelections(v) {
      // Don't Search Values from Selections
      if (this.selectedSuggestion && this.selectedSuggestion["label"] == v) {
        return
      }
      this.loading = true
      try {
        const response = await fetch(
          `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${v}&resultType=street&country=USA&apiKey=${this.$env.HERE_MAP_APIKEY}`,
          {
            method: "get"
          }
        )
        this.loading = false
        if (response.ok) {
          const jsonResponse = await response.json()
          const suggestionsRes = jsonResponse["suggestions"]
          let suggestions = []
          let exactMatchFound = false

          for (let i = 0; i < suggestionsRes.length; i++) {
            let suggestionRes = suggestionsRes[i]

            if (suggestionRes["matchLevel"] === "street") {
              if (suggestionRes["label"] === v) {
                exactMatchFound = true
              }
              suggestions.push({
                label: suggestionRes["label"],
                locationId: suggestionRes["locationId"],
                street: suggestionRes["address"]["street"],
                city: suggestionRes["address"]["city"],
                postalCode: suggestionRes["address"]["postalCode"],
                state: suggestionRes["address"]["state"]
              })
            }
          }

          // Add current value to options to allow for free text entry
          if (!exactMatchFound) {
            suggestions.unshift({
              label: v,
              locationId: v,
              street: v,
              city: null,
              postalCode: null,
              state: null
            })
          }

          this.items = suggestions
        }
      } catch (err) {
        this.loading = false
      }
    },
    async handleInput(item) {
      this.$emit("input", item["street"])
      this.$emit("update:value", item["street"])
    },
    async handleBlur(event) {
      this.$emit("blur", event)
      if (this.selectedSuggestion) {
        const { valid } = await this.$refs.provider.validate(
          this.selectedSuggestion["street"]
        )
        if (valid) {
          this.$emit("valid", this.selectedSuggestion["street"])
        }
      }
    },
    async handleChange(item) {
      const { valid } = await this.$refs.provider.validate(item["street"])
      if (valid) {
        this.$emit("change", item)
        this.$emit("valid", item["street"])
      }
    }
  }
}
</script>
