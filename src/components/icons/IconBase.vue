<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation"
    :stroke-width="strokeWidth"
    class="w-6"
    fill="none"
    :stroke="strokeColor"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconBase',
  props: {
    iconName: {
      type: String,
      default: 'box',
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    viewBox: {
      type: [Number, String],
      default: '0 0 24 24',
    },
    height: {
      type: [Number, String],
      default: 18,
    },
    strokeWidth: {
      type: [Number, String],
      default: 1.5,
    },
    strokeColor: {
      type: [Number, String],
      default: 'white',
    },
    iconColor: {
      type: String,
      default: 'currentColor',
    },
  },
};
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px; /* yes, I'm that particular about formatting */
}
</style>
