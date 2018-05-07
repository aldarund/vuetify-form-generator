<template>
    <div v-html="field.label"></div>
</template>
<script>
import abstractField from '../abstractField'

export default {
  mixins: [abstractField],
  fieldTypes: ['text_display']
}
</script>
