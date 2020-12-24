<template>
  <div class="history-container">
    <div class="history-wrapper">
      <button
        class="btn"
        :class="[name === 'historyEth' ? 'active-tabs' : '']"
        @click="handleClick('historyEth')"
      >
       {{ $t('btn.b3') }}
      </button>

      <button
        class="btn"
        :class="[name === 'historyLambda' ? 'active-tabs' : '']"
        @click="handleClick('historyLambda')"
      >
        {{ $t('btn.b4') }}
      </button>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      name: 'historyEth',
    };
  },
  computed: {
    ...mapState(['ethAddress', 'lambdaAddress']),
  },
  methods: {
    handleClick(val) {
      if (val === 'historyEth') {
        this.$router.push(
          `/history/eth/${this.lambdaAddress || this.$route.params.lambAddress}/${
            this.ethAddress || this.$route.params.ethAddress
          }`
        );
      } else {
        this.$router.push(
          `/history/lamb/${this.ethAddress || this.$route.params.ethAddress}/${
            this.lambdaAddress || this.$route.params.lambAddress
          }`
        );
      }
      this.name = val;
    },
    getTab() {
      this.name = this.$route.name;
    },
  },
  mounted() {
    this.getTab();
  },
};
</script>

<style lang="less" scoped>
.history-container {
  width: 100%;
  .history-wrapper {
    width: 80%;
    margin: 0 auto;
    margin-top: 110px;
  }
}
.btn {
  display: inline-block;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid transparent;
  color: #fff;
  font-size: 14px;
  margin-right: 20px;
  &:hover {
    background: #4761e9;
  }
}
.active-tabs {
  color: #fff;
  background: #4761e9;
}
</style>