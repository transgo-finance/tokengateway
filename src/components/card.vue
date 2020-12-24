<template>
  <div class="card-wrapper">
    <!-- <slot></slot> -->
    <h5 v-if="configTitle" class="title">{{ title }}</h5>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    configTitle: {
      type: Boolean,
      default: true
    },
  },
};
</script>

<style lang="less" scoped>
.card-wrapper {
  padding: 32px 28px;
  background: #ffffff;
  border-radius: 17px;
  .title {
    text-align: left;
    margin: 0;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
  }
}
</style>