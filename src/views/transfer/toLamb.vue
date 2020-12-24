<template>
  <card class="moveToLamb-wrapper" :title="$t('home.toLamb.t')">
    <!-- <Spin size="large" fix v-if="showLambFeeLoading"></Spin> -->
    <p class="card-label">
      <span class="card-item-left">
        <Tooltip placement="top-start" max-width="400" :content="$t('home.toLamb.c1')">
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
      <span class="card-item-right">{{ $t('home.toLamb.c2') }} {{ tlambBalance | formatTLAMBValue }} tLAMB</span>
    </p>

    <div class="card-input">
      <input v-model="tlambNum" @keyup="getToLambFee" type="text" class="input" :placeholder="$t('home.toLamb.c3')" />
    </div>

    <p class="card-label">
      <span class="card-item-left">{{ $t('home.toLamb.c4') }}</span>
      <span class="card-item-right">{{ getRealValue }} mLAMB</span>
    </p>

    <template v-if="showLambFee && !showLambFeeLoading && tlambNum != ''">
      <p class="card-label">
        <span class="card-item-left">{{ $t('home.toLamb.c5') }}</span>
        <span class="card-item-right">{{ lambFee | formatNormalValue }} mLAMB</span>
      </p>

      <p class="card-label">
        <span class="card-item-left">{{ $t('home.toLamb.c6') }}</span>
        <span class="card-item-right">{{ Number(ethGasFee).toFixed(5) }} ETH ≈ {{ gasFee.toFixed(5) }} USDT</span>
      </p>
    </template>

    <h3 class="notice">{{ $t('home.toLamb.c7') }}</h3>

    <div class="card-input">
      <input v-model="lambdaAddress" type="text" class="input" readonly />
    </div>

    <div class="btn-wrapper">
      <button class="btn moveBtn" v-if="rightLoading">
        <span class="spinner"></span>
        <span class="spinner-text">{{ $t('btn.b5') }}</span>
      </button>

      <button class="btn moveBtn" v-else-if="showLambFeeLoading">
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

          <span>{{ $t('home.toLamb.c8') }}</span>
        </div>

        <div class="pop-content" slot="content">
          <p class="title">{{ $t('home.toLamb.c4') }}</p>
          <p class="value">{{ getRealValue }} mLAMB</p>
          <p class="title">{{ $t('home.toLamb.c7') }}</p>
          <p class="value">{{ lambdaAddress }}</p>

          <div class="pop-btn-wrapper">
            <div class="pop-btn">
              <button @click="close" class="cancel">{{ $t('btn.b8') }}</button>
              <button @click="handleConfirm" class="confirm">{{ $t('btn.b9') }}</button>
            </div>
          </div>
        </div>
      </Poptip>
    </div>
  </card>
</template>

<script>
import config from '@/config/index.js';
import axios from 'axios';
import { mapState } from 'vuex';
import { debounce } from 'debounce';
import { ethusdt } from '@/contacthelp/ethusdt.js';
import bech32 from 'bech32';
const BigNumber = require('bignumber.js');
BigNumber.config({ DECIMAL_PLACES: 6 });
import { calculateGasMarginS } from '@/contacthelp/utils.js';
export default {
  data() {
    return {
      tlambNum: '',
      showLambFee: false,
      lambFee: 0,
      rightLoading: false,
      showLambFeeLoading: false,
      showPop: false,
      gasPrice: null,
      gasFee: null,
      ethGasFee: null,
      realVal: 0,
    };
  },
  components: {
    card: () => import('@components/card.vue'),
  },
  computed: {
    ...mapState(['ethAddress', 'lambdaAddress', 'tlambBalance', 'contract']),
    getRealValue() {
      const x = new BigNumber(this.tlambNum);
      const y = new BigNumber(this.lambFee);
      const val = x.minus(y);
      if (isNaN(val)) {
        return 0;
      } else {
        this.realVal = val.toNumber().toFixed(5);
        return this.realVal;
      }
    },
  },
  methods: {
    handleConfirm() {
      this.showPop = false;
      if (!this.lambdaAddress) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n4'),
        });
        return false;
      }
      if (!this.ethAddress) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n1'),
        });
        return false;
      }
      if (this.tlambNum === '') {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n21'),
        });
        return false;
      }
      if (this.tlambNum < config.minTlamb) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: `${this.$t('notice.n25')} ${config.minTlamb} tLAMB`,
        });
        return false;
      }
      if (this.realVal < 0) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n16'),
        });
        this.tlambNum = '';
        return false;
      }
      this.rightLoading = true;
      this.sendTx();
    },
    close() {
      this.showPop = false;
    },

    // 输入框只能输入数字
    validateData(val) {
      const reg = new RegExp('^[0-9]+([.]{1}[0-9]+){0,1}$');
      if (!reg.test(this.tlambNum)) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n22'),
        });
        this.tlambNum = '';
        return false;
      } else {
        const balance = new BigNumber(this.tlambBalance).div('1e18').toNumber();
        if (this.tlambNum > balance) {
          this.$Notice.warning({
            title: this.$t('notice.n'),
            desc: this.$t('notice.n22'),
          });
          this.tlambNum = '';
          return false;
        }

        // 最小值限制
        if (this.tlambNum < config.minTlamb) {
          this.$Notice.warning({
            title: this.$t('notice.n'),
            desc: `${this.$t('notice.n25')} ${config.minTlamb} tLAMB`,
          });
          return false;
        }
      }
      return true;
    },
    // 对输入防抖处理
    getToLambFee: debounce(async function (e) {
      const isReq = this.validateData();
      if (isReq) {
        this.showLambFeeLoading = true;
        await this.getEthFee();
        await this.requestToLambFee();
      }
    }, 500),

    // 获取迁移至主网的手续费
    async requestToLambFee() {
      let param = {
        method: 'get',
        url: `${config.baseApiUrl}status`,
        params: {
          symbol: 'ulamb',
        },
      };
      try {
        let res = await axios(param);
        this.lambFee = res.data.platform_fee;
        this.showLambFee = true;
        this.showLambFeeLoading = false;
        // console.log(res);
      } catch (error) {
        console.log('error');
      }
    },

    // 迁移到主网
    async sendTx() {
      try {
        const byte = this.getBytes(this.lambdaAddress);
        const hex = web3.utils.bytesToHex(byte); //转换成16进制

        const num = web3.utils.toWei(this.tlambNum, 'ether');

        let esGas = await this.contract.methods.userBurnRemarks(num, hex).estimateGas({ from: this.ethAddress });

        esGas = new web3.utils.BN(esGas);
        // console.log(esGas.toString());

        let gas = calculateGasMarginS(esGas);
        // console.log(gas);

        let res = await this.contract.methods.userBurnRemarks(num, hex).send({ from: this.ethAddress, gas });

        if (res.status) {
          this.$Notice.success({
            title: this.$t('notice.n19'),
            desc: this.$t('notice.n20'),
          });
          await this.getTlambBalance();
          this.rightLoading = false;
        }
      } catch (error) {
        console.log(error);
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n23'),
        });
        this.rightLoading = false;
      }
    },

    getBytes(address) {
      const decoded = bech32.decode(address);
      return Buffer.from(bech32.fromWords(decoded.words));
    },

    // 获取 tlamb 余额
    async getTlambBalance() {
      try {
        let tlambBalance = await this.contract.methods.balanceOf(this.ethAddress).call();
        // console.log(this.tlambBalance);
        this.$store.commit('changeTlambBalance', tlambBalance);
      } catch (error) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n14'),
        });
      }
    },

    // 获取以太坊手续费
    async getEthFee() {
      await this.getGasPrice();

      const gas = await this.getEstimateGas();

      let originWei = (gas * this.gasPrice).toString();

      this.ethGasFee = web3.utils.fromWei(originWei);

      const weiTousdt = await ethusdt();

      this.gasFee = weiTousdt * this.ethGasFee;
    },

    // 预估需要消耗的gas
    async getEstimateGas() {
      try {
        const byte = this.getBytes(this.lambdaAddress);
        const hex = web3.utils.bytesToHex(byte); //转换成16进制
        const num = web3.utils.toWei(this.tlambNum, 'ether');
        const gas = await this.contract.methods.userBurnRemarks(num, hex).estimateGas({ from: this.ethAddress });
        return gas;
      } catch (error) {
        console.log(error);
        if (error.code && error.code === -32000) {
          this.$Notice.warning({
            title: this.$t('notice.n'),
            desc: this.$t('notice.n24'),
          });
          this.tlambNum = '';
        }
        this.showLambFeeLoading = false;
        console.log('获取预估gas失败');
      }
    },

    // 获取gasPrice
    async getGasPrice() {
      try {
        const res = await web3.eth.getGasPrice();
        this.gasPrice = res;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.moveToLamb-wrapper {
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