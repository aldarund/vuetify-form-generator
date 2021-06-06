<template>
  <div class="field-container">
    <div class="marker-holder">
      <span v-show="focused"
class="marker">
        <svg
          width="26"
          height="18"
          viewBox="0 0 26 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.3145 9.69978L17.4574 16.6998C17.2693 16.8918 17.0118 17 16.743 17L2 17C1.44772 17 1 16.5523 1 16L0.999999 2C0.999999 1.44772 1.44772 1 2 1L16.743 1C17.0118 1 17.2693 1.10821 17.4574 1.30022L24.3145 8.30022C24.6954 8.68901 24.6954 9.31099 24.3145 9.69978Z"
            stroke="#1976D2"
            stroke-width="2"
          />
        </svg>
      </span>
    </div>
    <div style="flex:1">
      <slot :handleFieldComplete="handleFieldComplete" />
    </div>
  </div>
</template>
<script>
export default {
  name: "FocusableField",
  props: {
    focused: { type: Boolean, default: false },
    focusIndex: { type: Number, default: 0 },
    nextAvailable: { type: Boolean, default: true }
  },
  methods: {
    handleFieldComplete(e) {
      if (this.nextAvailable) {
        this.$emit("focus-next", this.focusIndex + 1)
      }
    }
  }
}
</script>
<style scoped>
.field-container {
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
}
.marker {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #1976d2;
}
.marker-holder {
  width: 40px;
}
</style>
