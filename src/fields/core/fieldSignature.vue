<template>
    <div>
        <div v-if="mode === 'graph'">
            <vue-signature ref="signature" :sigOption="option"></vue-signature>
            <a @click="mode = 'text'">Prefer to type your signature? Click here</a>
            <v-btn @click="clear()">clear</v-btn>
        </div>
        <div v-else="mode === 'text'">
            <div class="signature-text">{{localValue}}</div>
            <v-text-field
                    v-model="localValue"
                    :label="field.label"
                    :required="field.required"
                    :readonly="field.editable"
                    :disabled="field.disabled"
                    :placeholder="field.placeholder"
                    :name="field.name"
                    :id="field.name"
                    @blur="onBlur"
                    @change="onChange"
                    @focus="onFocus"
                    @input="onInput"
            />
            <a @click="mode = 'graph'">Prefer to draw your signature? Click here</a>
        </div>
    </div>
</template>
<style scoped>
    @font-face {
        font-family: 'Quentin';
        src: url('./../../assets/fonts/Quentin.woff2') format('woff2'),
        url('./../../assets/fonts/Quentin.woff') format('woff');
        font-weight: bold;
        font-style: normal;
    }

    .signature-text {
        font-family: Quentin, sans-serif;
        font-size: 30px;
    }
</style>

<script>
  import abstractField from '../abstractField'
  import VueSignature from 'vue-signature'

  export default {
    mixins: [abstractField],
    fieldTypes: ['signature'],
    components: {
      'vue-signature': VueSignature
    },
    data () {
      return {
        mode: 'graph',
        option: {
          onEnd: () => (
            this.save()
          )
        }
      }
    },
    methods: {
      save () {
        let sign = this.$refs.signature.save()
        this.$emit('upd', sign, this.field.name)
      },
      clear () {
        this.$refs.signature.clear()
        this.$emit('upd', '', this.field.name)
      }
    }
  }
</script>
