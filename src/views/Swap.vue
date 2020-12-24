<template>
  <div class="swap-wrapper">
    <card :title="$t('swap.pageTitle')" class="tx-card">
      <div class="card-item firstInput">
        <p class="card-label">
          <span class="card-item-left">{{$t('swap.fromToken')}}</span>
          <span class="card-item-right">{{ coinAsymbol }} {{$t('swap.balance')}}: {{ coinAbalance | formatTLAMBValue }}</span>
        </p>
        <myInput ref="TokenAmountA" :TokenAmount="coinA"></myInput>
      </div>

      <i class="swap-arrow">
        <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.471665 11.0325L6.65147 17.2123C7.13411 17.695 7.91649 17.695 8.39913 17.2123L14.5789 11.0325C15.0616 10.5499 15.0616 9.7675 14.5789 9.28486C14.0963 8.80222 13.3139 8.80222 12.8313 9.28486L8.76124 13.3549V1.50696C8.76124 0.824088 8.20814 0.270985 7.52527 0.270985C6.84239 0.270985 6.28929 0.824088 6.28929 1.50696V13.3549L2.21925 9.28486C1.97824 9.04382 1.66183 8.92272 1.34541 8.92272C1.02899 8.92272 0.712601 9.04322 0.471569 9.28486C-0.0110714 9.7675 -0.0110714 10.5499 0.471569 11.0325H0.471665Z"
            fill="#F78647"
          />
        </svg>
      </i>

      <div class="card-item secInput">
        <p class="card-label">
          <span class="card-item-left">{{$t('swap.toToken')}}</span>
          <span class="card-item-right">{{ coinBsymbol }} {{$t('swap.balance')}}: {{ coinBbalance | formatTLAMBValue }}</span>
        </p>
        <myInput ref="TokenAmountB" :TokenAmount="coinB"></myInput>

        <div v-if="pricecoinAinfo" class="price-wrapper">
          <span class="mr10">{{$t('swap.price')}}：</span>

          <span class="mr10">{{ pricecoinAinfo }} {{ priceUnit }}</span>
        </div>
        <div v-if="PriceImpact" class="price-wrapper">
          <span class="mr10">
            <Tooltip max-width="500" :content="$t('swap.help.PriceImpact')">
              {{$t('swap.PriceImpact')}}
              <Icon class="ios-help" type="md-help-circle" />
            </Tooltip>
          </span>

          <span class="mr10">{{ PriceImpact }}</span>
        </div>
        <div v-if="LiquidityProviderFee" class="price-wrapper">
          <span class="mr10">
            <Tooltip max-width="500" :content="$t('swap.help.LiquidityProviderFee')">
              {{$t('swap.LiquidityProviderFee')}}
              <Icon class="ios-help" type="md-help-circle" />
            </Tooltip>
          </span>

          <span class="mr10">{{ LiquidityProviderFee }}</span>
        </div>
        <div v-if="Minimumreceived" class="price-wrapper">
          <span class="mr10">
            <Tooltip max-width="500" :content="$t('swap.help.Minimumreceived')">
              {{$t('swap.Minimumreceived')}}
              <Icon class="ios-help" type="md-help-circle" />
            </Tooltip>
          </span>

          <span class="mr10">{{ Minimumreceived }} {{ coinBsymbol }}</span>
        </div>
        <div v-if="gasFee" class="price-wrapper">
          <span class="mr10">
            <Tooltip max-width="500" :content="$t('swap.help.ethgasfree')">
              {{$t('swap.ethgasfree')}}
              <Icon class="ios-help" type="md-help-circle" />
            </Tooltip>
          </span>

          <span class="mr10">{{ ethformat }}eth ≈ {{ useUsdt }}usdt</span>
        </div>
      </div>

      <div class="btn-wrapper">
        <button @click="getEthAuth" v-if="!!ethAddress == false" class="btn connect-btn">{{$t('swap.LinkWallet')}}</button>
        <div v-else>
          <button v-if="showloading" style="margin-top: 5px" class="btn connect-btn">loading...</button>
          <div v-else>
            <button v-if="PriceImpactGreater" style="margin-top: 5px" class="btn connect-btn">
              {{$t('swap.PriceImpactError')}}
            </button>
            <button v-else-if="needApprove" style="margin-top: 5px" class="btn connect-btn" @click="approve">
              {{$t('swap.approve')}}  {{ coinAsymbol }}
            </button>

            <button @click="makeSwap" v-else style="margin-top: 5px" class="btn connect-btn">{{$t('swap.swapBtn')}}</button>
          </div>
        </div>
      </div>
      <div class="Version">
        v{{ version }} |
        <a target="_blank" href="https://app.uniswap.org/">Uniswap</a>
      </div>
    </card>
    <div class="notice-wrapper">
      <div class="notice-content">
        <ul>
          <li>{{$t('swap.helpTxt.title1')}}</li>
          <p>
            {{$t('swap.helpTxt.titlep')}}
          </p>
          <li>{{$t('swap.helpTxt.title2')}}</li>
          <p>
            {{$t('swap.helpTxt.titlep2')}}
            <br />
            <tlambLink/>
          </p>
          <li>{{$t('swap.helpTxt.title3')}}</li>
          <p>
            {{$t('swap.helpTxt.titlep3')}}
          </p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  INITIAL_ALLOWED_SLIPPAGE,
  ONE_BIPS,
  BASE_FEE,
  ONE_HUNDRED_PERCENT,
  BLOCKED_PRICE_IMPACT_NON_EXPERT,
} from '@/constants/index.js';
import { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType, Percent, Router } from '@uniswap/sdk';
import JSBI from 'jsbi/dist/jsbi.mjs';

import tlambLink from '@/components/tlambLink.vue'

import { useTokenbalance } from '@/contacthelp/Allowances.js';

// var Web3 = require("web3");

import { useNeedApprove } from '@/contacthelp/useNeedApprove.js';

import { useApproveCallbackFromTrade } from '@/contacthelp/useApproveCallback.js';
import { useApproveCallbackFromTrade as useApproveCallbackFromTradeLamb } from '@/contacthelp/useApproveCallbacklamb.js';

import buildSwap from '@/contacthelp/buildSwap.js';
import SendSwap from '@/contacthelp/SendSwap.js';
import getTransaction from '@/contacthelp/getTransaction.js';
import { mapState } from 'vuex';

import { basisPointsToPercent } from '@/contacthelp/utils.js';

import SendSwapGas from '@/contacthelp/SendSwapGas.js';

import { ethusdt, getGasPrice } from '@/contacthelp/ethusdt.js';

import { useApproveCallbackFromTradegas } from '@/contacthelp/useApproveGas.js';
import { useApproveCallbackFromTradeGas as useApproveCallbackFromTradeLambGas } from '@/contacthelp/useApprovelambgas.js';

import getethProvider from '@/contacthelp/getethProvider.js'

//  import packageJS from '../../../package.json'

var packageJS = require('../../package.json');

console.log('packageJS', packageJS);

var coinATokenAmount, coinBTokenAmount, tradeData;

var weitousdt;

export default {
  components: {
    card: () => import('@components/card.vue'),
    myInput: () => import('@components/myInput.vue'),
    tlambLink
  },
  data() {
    return {
      coinBValue: '',
      pricecoinAinfo: '',
      pricecoinBinfo: '',
      priceUnit: '',
      PriceImpact: '',
      coinBbalance: '',
      coinAbalance: '',
      coinAsymbol: '',
      coinBsymbol: '',
      needApprove: false,
      showloading: false,
      havelinkwallet: true,
      timeid: '',
      PriceImpactGreater: false,
      LiquidityProviderFee: '',
      Minimumreceived: '',
      weitousdt: '',
      gasFee: '',
      version: packageJS.version,
    };
  },
  async mounted() {
    var _this = this;
    this.$data.timeid = setInterval(() => {
      _this.Refreshbalance();
    }, 1000 * 30);

    this.$data.weitousdt = await ethusdt();
  },
  beforeDestroy() {
    clearInterval(this.$data.timeid);
  },
  methods: {
    async getEthAuth() {
      try {
        // 请求用户授权
        this.$store.commit('changeOpenethWallet', true);
        return ;

        // let res = await window.ethereum.enable();
        // this.$store.commit('OpenethWallet', true);

      } catch (error) {
        // 用户不授权时
        this.$Notice.warning({
          title: this.$t('swap.actions.checkMetaMask'),
        });
        console.error('User denied account access');
      }
    },
    async coinA(data) {
      console.log(data);
      coinATokenAmount = data;
      this.$data.coinAsymbol = data.token.symbol;
      var uresult = await this.getbalance(coinATokenAmount);

      this.$data.coinAbalance = uresult.raw.toString();
      // this.$data.coinAbalance = Number(this.$data.coinAbalance).toFixed(6);
      if (data.equalTo(0)) {
        this.clearPrise();
        return;
      }

      if (data.greaterThan(uresult)) {
        this.$Notice.info({
          title: this.$t('swap.actions.Amountexceedsbalance'),
          desc: this.$t('swap.actions.Amountexceedsbalance'),
        });
        this.clearPrise();
        return;
      }

      try {
        this.$data.showloading = true;
        await this.calculationBcoinValue();
      } catch (error) {
        console.log(error);
      }

      var haveapprove = await this.checkapprove();

      console.log('haveapprove', haveapprove);

      try {
        if (haveapprove == false) {
          await this.SwapGas();
        } else {
          await this.approveGas();
        }
      } catch (error) {
        console.log(error);
      }

      this.$data.showloading = false;
    },
    async coinB(data) {
      console.log(data);
      coinBTokenAmount = data;
      this.$data.coinBsymbol = data.token.symbol;
      var uresult = await this.getbalance(coinBTokenAmount);
      this.$data.coinBbalance = uresult.raw.toString();
      // this.$data.coinBbalance = Number(this.$data.coinBbalance).toFixed(6);
      try {
        this.$data.showloading = true;
        await this.calculationBcoinValue();
      } catch (error) {
        console.log(error);
      }
      var haveapprove = await this.checkapprove();

      console.log('haveapprove', haveapprove);
      try {
        if (haveapprove == false) {
          await this.SwapGas();
        } else {
          await this.approveGas();
        }
      } catch (error) {
        console.log(error);
      }

      this.$data.showloading = false;
    },
    async Refreshbalance() {
      if (tradeData == undefined) {
        return;
      }
      var trade = tradeData;
      var coinATokenAmount = trade.inputAmount;
      var coinBTokenAmount = trade.outputAmount;
      var uresulta = await this.getbalance(coinATokenAmount);

      this.$data.coinAbalance = uresulta.raw.toString();

      var uresultb = await this.getbalance(coinBTokenAmount);
      this.$data.coinBbalance = uresultb.raw.toString();
    },
    async calculationBcoinValue() {
      console.log('calculationBcoinValue');
      if (coinATokenAmount != undefined && coinBTokenAmount != undefined) {
        if (
          coinATokenAmount.token.address != coinBTokenAmount.token.address &&
          coinATokenAmount.raw.toString() != '0'
        ) {
          this.clearPrise();

          const pair = await Fetcher.fetchPairData(coinATokenAmount.token, coinBTokenAmount.token,getethProvider(coinBTokenAmount.token));

          console.log(pair);
          const route = new Route([pair], coinATokenAmount.token);

          const trade = new Trade(route, coinATokenAmount, TradeType.EXACT_INPUT);
          tradeData = trade;

          this.$data.coinBValue = trade.outputAmount.toSignificant(6);
          this.$refs.TokenAmountB.setValue(this.$data.coinBValue);

          // var pricecoinA = trade.route.pairs[0].priceOf(coinATokenAmount.token);

          this.$data.pricecoinAinfo = trade.executionPrice.toSignificant(6);
          this.$data.pricecoinBinfo = trade.executionPrice.invert().toSignificant(6);
          this.$data.priceUnit = trade.outputAmount.token.symbol + ' per ' + trade.inputAmount.token.symbol;

          ///===
          const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE);

          const realizedLPFee = !trade
            ? undefined
            : ONE_HUNDRED_PERCENT.subtract(
                trade.route.pairs.reduce(
                  (currentFee) => currentFee.multiply(INPUT_FRACTION_AFTER_FEE),
                  ONE_HUNDRED_PERCENT
                )
              );

          const priceImpactWithoutFeeFraction =
            trade && realizedLPFee ? trade.priceImpact.subtract(realizedLPFee) : undefined;

          const priceImpactWithoutFeePercent = priceImpactWithoutFeeFraction
            ? new Percent(priceImpactWithoutFeeFraction.numerator, priceImpactWithoutFeeFraction.denominator)
            : undefined;

          this.$data.PriceImpact = priceImpactWithoutFeePercent
            ? priceImpactWithoutFeePercent.lessThan(ONE_BIPS)
              ? '<0.01%'
              : priceImpactWithoutFeePercent.toFixed(2) + '%'
            : '-';

          if (priceImpactWithoutFeePercent.greaterThan(BLOCKED_PRICE_IMPACT_NON_EXPERT)) {
            this.$data.PriceImpactGreater = true;
          } else {
            this.$data.PriceImpactGreater = false;
          }
          var LiquidityProviderFee = realizedLPFee
            ? trade.inputAmount.multiply(realizedLPFee).toSignificant(6) + ' ' + trade.inputAmount.currency.symbol
            : '-';
          this.$data.LiquidityProviderFee = LiquidityProviderFee;

          const pct = basisPointsToPercent(INITIAL_ALLOWED_SLIPPAGE);
          var Minimumreceived = trade.minimumAmountOut(pct);
          this.$data.Minimumreceived = Minimumreceived.toSignificant(4);

          // console.log(
          //   "Minimum received",
          //   Minimumreceived.toSignificant(4)
          // );
          ///===

          ///===

          ///===
        } else {
          this.clearPrise();
        }
      }
    },
    clearPrise() {
      // coinBValue: "",
      // pricecoinAinfo: "",
      // pricecoinBinfo: "",
      // priceUnit: "",
      // PriceImpact:''
      this.$data.coinBValue = '';
      this.$data.pricecoinAinfo = '';
      this.$data.pricecoinBinfo = '';
      this.$data.priceUnit = '';
      this.$data.PriceImpact = '';
      this.$refs.TokenAmountB.setValue(this.$data.coinBValue);
      tradeData = undefined;
      (this.$data.LiquidityProviderFee = ''), (this.$data.Minimumreceived = '');
      this.$data.gasFee = '';
    },
    async getbalance(TokenAmount) {
      console.log(this);
      if (!!this.ethAddress == false) {
        return;
      }

      var library = window.ethersprovider;
      var account = this.ethAddress;
      var token = TokenAmount.token;

      var result = await useTokenbalance(library, account, token);
      console.log(result);

      return result;
    },
    async checkapprove() {
      var library = window.ethersprovider;
      var account = this.ethAddress;
      var trade = tradeData;
      if (tradeData == undefined) {
        return;
      }

      var needApprove = await useNeedApprove(account, library, trade, INITIAL_ALLOWED_SLIPPAGE);

      this.$data.needApprove = needApprove;
      return needApprove;
    },
    async approveGas() {
      var library = window.ethersprovider;
      var account = this.ethAddress;
      var trade = tradeData;
      var result;
      if (trade == undefined) {
        this.$Notice.error({
          title: this.$t('swap.actions.choosedifferentassettransaction'),
          desc:this.$t('swap.actions.choosedifferentassettransaction'),
        });
        return;
      }
      try {
        if (trade.inputAmount.token.symbol == 'tLAMB') {
          result = await useApproveCallbackFromTradegas(account, library, trade, INITIAL_ALLOWED_SLIPPAGE);
        } else {
          result = await useApproveCallbackFromTradeLambGas(account, library, trade, INITIAL_ALLOWED_SLIPPAGE);
        }
        console.log('gas', result);
        var gasPrice = await getGasPrice(library);
        var useWEI = result.mul(gasPrice);

        var useWei = web3.utils.fromWei(useWEI.toString());

        // this.$data.gasFee = (Number(useWei)*Number(this.$data.weitousdt)).toFixed(3)  ;
        this.$data.gasFee = useWei;
      } catch (error) {
        console.log(error);
      }
    },
    async approve() {
      var library = window.ethersprovider;
      var account = this.ethAddress;
      var trade = tradeData;
      var result;
      if (trade == undefined) {
        this.$Notice.error({
          title: this.$t('swap.actions.choosedifferentassettransaction'),
          desc: this.$t('swap.actions.choosedifferentassettransaction'),
        });
        return;
      }
      this.$data.showloading = true;
      try {
        if (trade.inputAmount.token.symbol == 'tLAMB') {
          result = await useApproveCallbackFromTrade(account, library, trade, INITIAL_ALLOWED_SLIPPAGE);
        } else {
          result = await useApproveCallbackFromTradeLamb(account, library, trade, INITIAL_ALLOWED_SLIPPAGE);
        }
        console.log(result);
        var txinfo = await getTransaction(result.hash);
        console.log(txinfo);
        if (txinfo.status == false) {
          console.log('status', txinfo);
          throw new Error(this.$t('swap.actions.Transactionfailure'));
        }
        this.checkapprove();
        this.$data.showloading = false;
        this.$Notice.success({
          title: this.$t('swap.actions.approvesuccessful'),
          desc: result.summary,
        });
      } catch (error) {
        this.$data.showloading = false;
      }
    },
    async SwapGas() {
      var library = window.ethersprovider;
      var recipient = this.ethAddress;
      var ChainId = this.ethChainID;

      var trade = tradeData;

      if (trade == undefined) {
        return;
      }

      var blockTime = await this.getTime();

      var gasPrice = await getGasPrice(library);
      console.log('gasPrice', gasPrice);

      var data = await buildSwap(recipient, blockTime, trade, ChainId, library);
      var gasData = await SendSwapGas(data.data, data.trade, recipient);
      console.log('gasData', gasData);
      var useWEI = gasData.mul(gasPrice);

      var useWei = web3.utils.fromWei(useWEI.toString());

      this.$data.gasFee = useWei;
    },
    async makeSwap() {
      var library = window.ethersprovider;
      var recipient = this.ethAddress;
      var trade = tradeData;
      var blockTime = await this.getTime();

      if (trade == undefined) {
        this.$Notice.error({
          title: this.$t('swap.actions.choosedifferentassettransaction'),
          desc:this.$t('swap.actions.choosedifferentassettransaction'),
        });
        return;
      }
      this.$data.showloading = true;
      var blockTime = await this.getTime();
      var ChainId = this.ethChainID;

      try {
        var data = await buildSwap(recipient, blockTime, trade, ChainId, library);
        var result = await SendSwap(data.data, data.trade, recipient);
        console.log('交易结果', result);
        this.$Notice.info({
          title: this.$t('swap.actions.Transactionsent'),
          desc: result.base,
        });

        var txinfo = await getTransaction(result.hash);
        console.log(txinfo);
        if (txinfo.status == false) {
          console.log('status', txinfo);
          throw new Error(this.$t('swap.actions.Transactionfailure'));
        }
        this.$data.showloading = false;
        this.$Notice.success({
          title: this.$t('swap.actions.Successfultrade'),
          desc: result.base,
        });
        this.clearData();
        await this.Refreshbalance();
      } catch (error) {
        console.log(error);
        this.$data.showloading = false;
        this.$Notice.error({
          title: this.$t('swap.actions.Transactionfailure'),
          desc: error.message,
        });
      }
    },
    clearData() {
      this.$data.coinBValue = '';
      this.$data.pricecoinAinfo = '';
      this.$data.pricecoinBinfo = '';
      this.$data.priceUnit = '';
      this.$data.PriceImpact = '';
      this.$refs.TokenAmountB.setValue('');
      this.$refs.TokenAmountA.setValue('');
      tradeData = undefined;
      this.$data.LiquidityProviderFee = '';
      this.$data.Minimumreceived = '';
      this.$data.gasFee = '';
    },
    async getChainId() {
      // let web3 = new Web3(window.ethereum);
      // const getBlock = util.promisify(web3.eth.getBlock)
      // var data = web3.eth.getChainId();
      return this.ethChainID;
    },
    async getTime() {
      let web3 = new Web3(window.ethereum);
      // const getBlock = util.promisify(web3.eth.getBlock)
      return new Promise((resolve, reject) => {
        web3.eth.getBlock('latest', (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data.timestamp);
          }
        });
      });
    },
  },
  computed: {
    ...mapState(['ethAddress', 'lambdaAddress', 'ethChainID']),
    useUsdt() {
      return (Number(this.$data.gasFee) * Number(this.$data.weitousdt)).toFixed(4);
    },
    ethformat() {
      return Number(this.$data.gasFee).toFixed(4);
    },
  },
};
</script>

<style lang="less" scoped>
.swap-wrapper {
  width: 100%;
  position: relative;
  .tx-card {
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
    // width: 350px;
    width: 425px;
    margin: 0px auto;
    margin-top: 150px;

    text-align: center;
    .firstInput {
      .card-label {
        margin: 20px 0 10px 0;
      }
    }
    .secInput {
      .card-label {
        margin: 0 0 10px 0;
      }
      .price-wrapper {
        text-align: left;
        margin-top: 10px;
        font-size: 12px;
        line-height: 17px;
        color: #5e6d82;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
    .swap-arrow {
      display: inline-block;
      margin: 10px 0;
      cursor: pointer;
    }

    .btn-wrapper {
      width: 100%;
      margin-top: 60px;
      .connect-btn {
        width: 100%;
        height: 36px;
      }
    }
  }
}

.Version {
  margin-top: 10px;
  color: #6d6060;
  font-size: 11px;
  a {
    color: #6d6060;
  }
}

.notice-wrapper {
  width: 100%;
  margin-bottom: 50px;
  font-size: 13px;
  line-height: 23px;
  color: #dfdfdf;
  .notice-content {
    margin-left: 100px;
    margin-top: 50px;
    margin-right: 100px;
    li {
      margin-top: 20px;
    }
    a {
      color: yellow;
    }
  }
}

.ios-help{
  font-size: 16px;

}

</style>