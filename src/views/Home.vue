<template>
  <div class="home">
    <div class="home-wrapper">
      <div class="card-container">
        <!-- 迁移资产至以太坊 lamb=>tlamb  -->
        <toEth></toEth>
        <!-- 迁移资产至 Lambda 主网 tlamb=>lamb -->
        <toLamb></toLamb>
      </div>

      <div class="notice-wrapper">
        <ul>
          <li>{{ $t('home.question.q1') }}</li>
          <p>{{ $t('home.question.q2') }}</p>
          <li>{{ $t('home.question.q3') }}</li>
          <p>{{ $t('home.question.q4') }}</p>
          <li>{{ $t('home.question.q5') }}</li>
          <p>
            {{ $t('home.question.q6') }}
            <br />
            <tlambLink />
          </p>

          <li>{{ $t('home.question.q7') }}</li>
          <p>{{ $t('home.question.q8') }}</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import toEth from './transfer/toEth.vue';
import toLamb from './transfer/toLamb.vue';
import { mapState } from 'vuex';
import tlambLink from '@/components/tlambLink.vue';

export default {
  name: 'Home',
  data() {
    return {
      timer: null,
    };
  },
  components: {
    toEth,
    toLamb,
    tlambLink,
  },
  computed: {
    ...mapState(['chainID']),
  },
  mounted() {
    let time = setTimeout(async () => {
      // 检查是否连接以太坊钱包
      let ethRes = await this.$parent.isEthConnect();

      // 检查是否连接lambda钱包
      let lambRes = await this.$parent.isConnectLambda(this.chainID);

      if (ethRes) {
        this.$parent.getTlambBalance();
      }

      if (lambRes) {
        this.$parent.getLambBalance();
      }
      clearTimeout(time);
    }, 1500);

    this.timer = setInterval(async () => {
      // 检查是否连接以太坊钱包
      let ethRes = await this.$parent.isEthConnect();

      // 检查是否连接lambda钱包
      let lambRes = await this.$parent.isConnectLambda(this.chainID);

      if (ethRes) {
        // console.log('执行获取tlamb任务');
        this.$parent.getTlambBalance();
      }

      if (lambRes) {
        // console.log('执行获取lamb任务');
        this.$parent.getLambBalance();
      }
    }, 30 * 1000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
@import './media/index.less';

.home {
  width: 100%;
  .home-wrapper {
    // margin: 110px 200px 0px 200px;
    .card-container {
      margin-bottom: 90px;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
    .notice-wrapper {
      font-size: 13px;
      line-height: 23px;
      margin-bottom: 5%;
      color: #dfdfdf;
      li {
        margin-top: 20px;
      }
      a {
        color: yellow;
      }
    }
  }
}
</style>
