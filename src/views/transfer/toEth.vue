<template>
  <card class="moveToEth-wrapper" :title="$t('home.toEth.t')">
    <!-- <Spin size="large" fix v-if="showEthFeeLoading"></Spin> -->
    <p class="card-label">
      <span class="card-item-left">
        <Tooltip placement="top-start" max-width="400" :content="$t('home.toEth.c1')">
          <div class="attention-content">
            <svg
              t="1608550397917"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8308"
              width="20"
              height="20"
            >
              <path
                d="M951.37 814.18l-383.59-664.4c-24.51-42.45-85.79-42.45-110.3 0L73.89 814.18C49.38 856.64 80 909.7 129 909.7h767.22c49.03 0 79.66-53.06 55.15-95.52zM483.23 393.47a29.4 29.4 0 0 1 58.8 0v298.05a29.4 29.4 0 1 1-58.8 0zM512.63 814a30.1 30.1 0 1 1 30.1-30.1 30.1 30.1 0 0 1-30.1 30.1z"
                fill="#FCAE47"
                p-id="8309"
              ></path>
            </svg>
            <span>{{ $t('notice.n') }}</span>
          </div>
        </Tooltip>
      </span>
      <span class="card-item-right">{{ $t('home.toEth.c2') }} {{ lambBalance | formatLAMBValue }} mLAMB</span>
    </p>

    <div class="card-input">
      <input type="text" v-model="lambNum" @keyup="getToEthFee" class="input" :placeholder="$t('home.toEth.c3')" />
    </div>

    <p class="card-label">
      <span class="card-item-left">{{ $t('home.toEth.c4') }}</span>
      <span class="card-item-right">{{ getRealValue }} tLAMB</span>
    </p>

    <div v-if="showEthFee && !showEthFeeLoading && lambNum != ''">
      <p class="card-label">
        <span class="card-item-left">{{ $t('home.toEth.c5') }}</span>
        <span class="card-item-right">{{ txFee | formatNormalValue }} tLAMB</span>
      </p>
      <p class="card-label">
        <span class="card-item-left">{{ $t('home.toEth.c6') }}</span>
        <span class="card-item-right">{{ ethFee | formatNormalValue }} tLAMB</span>
      </p>
    </div>

    <h3 class="notice">{{ $t('home.toEth.c7') }}</h3>

    <div class="card-input">
      <input v-model="ethAddress" type="text" class="input" readonly />
    </div>

    <div class="btn-wrapper">
      <div class="btn-wrapper">
        <button class="btn moveBtn" v-if="leftLoading">
          <span class="spinner"></span>
          <span class="spinner-text">{{ $t('btn.b5') }}</span>
        </button>

        <button class="btn moveBtn" v-else-if="showEthFeeLoading">
          <span class="spinner"></span>
          <span class="spinner-text">{{ $t('btn.b6') }}</span>
        </button>

        <Poptip
          v-model="showPop"
          v-else
          popper-class="toEthPop-wrapper pop-container"
          :transfer="true"
          padding="10px 20px"
        >
          <button class="btn moveBtn">{{ $t('btn.b7') }}</button>

          <div class="pop-title" slot="title">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.27404 0.546874C5.12661 0.182291 6.03525 0 7 0C7.96475 0 8.87339 0.182291 9.72596 0.546874C10.5785 0.91146 11.3217 1.41065 11.9555 2.04447C12.5893 2.67829 13.0885 3.42147 13.4531 4.27404C13.8177 5.12661 14 6.03525 14 7C14 7.96475 13.8177 8.87339 13.4531 9.72596C13.0885 10.5785 12.5893 11.3217 11.9555 11.9555C11.3217 12.5893 10.5785 13.0885 9.72596 13.4531C8.87339 13.8177 7.96475 14 7 14C6.03525 14 5.12661 13.8177 4.27404 13.4531C3.42147 13.0885 2.67829 12.5893 2.04447 11.9555C1.41065 11.3217 0.91146 10.5785 0.546875 9.72596C0.18229 8.87339 0 7.96475 0 7C0 6.03525 0.18229 5.12661 0.546875 4.27404C0.91146 3.42147 1.41065 2.67829 2.04447 2.04447C2.67829 1.41065 3.42147 0.91146 4.27404 0.546874ZM7.80777 7.47115C7.80777 7.69551 7.72924 7.88621 7.57219 8.04326C7.41514 8.20032 7.22443 8.27884 7.00008 8.27884C6.77572 8.27884 6.58501 8.20032 6.42796 8.04326C6.27091 7.88621 6.19238 7.69551 6.19238 7.47115V3.70192C6.19238 3.47756 6.27091 3.28685 6.42796 3.1298C6.58501 2.97275 6.77572 2.89423 7.00008 2.89423C7.22443 2.89423 7.41514 2.97275 7.57219 3.1298C7.72924 3.28685 7.80777 3.47756 7.80777 3.70192V7.47115ZM7.00008 10.9712C6.77572 10.9712 6.58501 10.8926 6.42796 10.7356C6.27091 10.5785 6.19238 10.3878 6.19238 10.1635C6.19238 9.93911 6.27091 9.7484 6.42796 9.59135C6.58501 9.4343 6.77572 9.35577 7.00008 9.35577C7.22443 9.35577 7.41514 9.4343 7.57219 9.59135C7.72924 9.7484 7.80777 9.93911 7.80777 10.1635C7.80777 10.3878 7.72924 10.5785 7.57219 10.7356C7.41514 10.8926 7.22443 10.9712 7.00008 10.9712Z"
                fill="#FFBF00"
              />
            </svg>

            <span>{{ $t('home.toEth.c8') }}</span>
          </div>

          <div class="pop-content" slot="content">
            <p class="title">{{ $t('home.toEth.c4') }}</p>
            <p class="value">{{ getRealValue }} tLAMB</p>
            <p class="title">{{ $t('home.toEth.c7') }}</p>
            <p class="value">{{ ethAddress }}</p>

            <div class="pop-btn-wrapper">
              <div class="pop-btn">
                <button @click="close" class="cancel">{{ $t('btn.b8') }}</button>
                <button @click="handleConfirm" class="confirm">{{ $t('btn.b9') }}</button>
              </div>
            </div>
          </div>
        </Poptip>
      </div>
    </div>
  </card>
</template>

<script>
import config from '@/config/index.js';
import axios from 'axios';
import { mapState } from 'vuex';
import { debounce } from 'debounce';
const BigNumber = require('bignumber.js');
BigNumber.config({ DECIMAL_PLACES: 6 });
export default {
  data() {
    return {
      lambNum: '',
      showEthFee: false,
      txFee: '',
      ethFee: '',
      leftLoading: false,
      showEthFeeLoading: false,
      showPop: false,
      realVal: 0,
    };
  },
  components: {
    card: () => import('@components/card.vue'),
  },
  computed: {
    ...mapState(['ethAddress', 'lambdaAddress', 'lambBalance', 'tlambBalance', 'chainID']),
    getRealValue() {
      const x = new BigNumber(this.lambNum);
      const y = new BigNumber(this.ethFee);
      const z = new BigNumber(this.txFee);
      const val = x.minus(y).minus(z);
      if (isNaN(val)) {
        return 0;
      } else {
        this.realVal = val.toNumber().toFixed(6);
        return this.realVal;
      }
    },
  },
  methods: {
    handleConfirm() {
      this.showPop = false;
      if (!this.ethAddress) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n1'),
        });
        return false;
      }
      if (!this.lambdaAddress) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n4'),
        });
        return false;
      }

      if (this.lambNum === '') {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n15'),
        });
        return false;
      }
      // 最小值限制
      if (this.lambNum < config.minMlamb) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: `${this.$t('notice.n25')} ${config.minMlamb} mLAMB`,
        });
        return false;
      }

      if (this.realVal < 0) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n16'),
        });
        this.lambNum = '';
        return false;
      }

      this.leftLoading = true;
      this.sendToken();
    },
    close() {
      this.showPop = false;
    },

    validateData(val) {
      const reg = new RegExp('^[0-9]+([.]{1}[0-9]+){0,1}$');
      if (!reg.test(this.lambNum)) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n17'),
        });
        this.lambNum = '';
        return false;
      } else {
        // console.log(this.lambBalance);
        const balance = new BigNumber(this.lambBalance).div('1e6').toNumber();
        if (this.lambNum > balance) {
          this.$Notice.warning({
            title: this.$t('notice.n'),
            desc: this.$t('notice.n18'),
          });
          this.lambNum = '';
          return false;
        }

        // 最小值限制
        if (this.lambNum < config.minMlamb) {
          this.$Notice.warning({
            title: this.$t('notice.n'),
            desc: `${this.$t('notice.n25')} ${config.minMlamb} mLAMB`,
          });
          return false;
        }
      }

      return true;
    },

    // 对输入防抖处理
    getToEthFee: debounce(function () {
      const isReq = this.validateData();
      if (isReq) {
        this.requestToEthFee();
      }
    }, 500),

    // 获取迁移至以太坊的手续费
    async requestToEthFee() {
      this.showEthFeeLoading = true;
      let param = {
        method: 'get',
        url: `${config.baseApiUrl}status`,
        params: {
          symbol: 'eth',
          to: this.ethAddress,
          amount: this.lambNum,
        },
      };
      try {
        let res = await axios(param);
        this.txFee = res.data.transaction_fee;
        this.ethFee = res.data.platform_fee;
        this.showEthFee = true;
        let timer = setTimeout(() => {
          this.showEthFeeLoading = false;
          clearTimeout(timer);
        }, 1000);
        // console.log(res);
      } catch (error) {
        console.log('error');
      }
    },

    // 迁移至以太坊
    async sendToken() {
      let lambdaAddress;
      if (this.isLambdaTest(this.chainID)) {
        lambdaAddress = config.lambdaAddress;
      } else {
        lambdaAddress = config.lambdaMainAddress;
      }
      try {
        const res = await window.keplrlamb.sendToken(lambdaAddress, 'ulamb', this.lambNum, this.ethAddress);
        // console.log(res);
        const isHaveHash = res.hash && res.hash.data ? true : false;
        const isSuccess = (item) => item.success === true;
        const logs = JSON.parse(res.deliverTx && res.deliverTx.log);
        const allSuccess = logs.every(isSuccess);
        // console.log(logs.every(isSuccess));

        if (isHaveHash && allSuccess) {
          let timer = setTimeout(() => {
            this.$Notice.success({
              title: this.$t('notice.n19'),
              desc: this.$t('notice.n20'),
            });
            this.getLambBalance();
            this.leftLoading = false;
            clearTimeout(timer);
          }, 7000);
        }
      } catch (error) {
        console.log(error);
        this.leftLoading = false;
      }
    },

    // 获取LAMB余额
    async getLambBalance() {
      try {
        const res = await window.keplrlamb.getAccountbalance(this.lambdaAddress);

        let lambBalance =
          res.data &&
          res.data.value &&
          res.data.value.coins &&
          res.data.value.coins[0] &&
          res.data.value.coins[0].amount;

        this.$store.commit('changeLambBalance', lambBalance);
      } catch (error) {
        console.log(error);
      }
    },

    // 检测lambda主网还是测试网
    isLambdaTest(chainID) {
      if (chainID.includes('test')) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.moveToEth-wrapper {
  position: relative;
  // width: 40%;
  .card-input {
    margin-bottom: 20px;
    .input {
      width: 90%;
      height: 32px;
    }
  }
}
.notice {
  margin-top: 35px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}

.btn-wrapper {
  margin-top: 25px;
  .moveBtn {
    padding: 8px 28px;
  }
}
</style>