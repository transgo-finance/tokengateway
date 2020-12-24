<template>
  <div class="add-pool-wrapper">
    <div class="card-main">
      <card class="card-container" :configTitle="false">
        <div class="title-wrapper" @click="backIndex">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.78447 11.1615L14.2999 5.64609L16.1384 7.48457L10.6229 13L16.1384 18.5154L14.2999 20.3539L8.78446 14.8385L6.94599 13L8.78447 11.1615Z"
              fill="#778CA2"
            />
          </svg>

          <span class="title">{{ $t('addpool.pageTitle1') }}</span>
        </div>

        <div class="addContent-wrapper">
          <div class="card-item firstInput">
            <p class="card-label">
              <span class="card-item-left">{{ $t('addpool.injection') }}</span>
              <span class="card-item-right">{{ $t('addpool.balance') }}: {{ coinAbalance | formatTLAMBValue }}</span>
            </p>
            <myInput ref="coinAInput" class="card-input" :TokenAmount="coinA"></myInput>
          </div>

          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="addSymbol"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M16.6534 7.65147H10.3483V1.34641C10.3483 0.988962 10.2063 0.646156 9.95357 0.393404C9.70081 0.140652 9.35801 -0.00134277 9.00056 -0.00134277C8.64312 -0.00134277 8.30031 0.140652 8.04756 0.393404C7.79481 0.646156 7.65281 0.988962 7.65281 1.34641V7.65147H1.34775C0.990304 7.65147 0.647499 7.79346 0.394747 8.04622C0.141995 8.29897 0 8.64177 0 8.99922C0 9.35666 0.141995 9.69947 0.394747 9.95222C0.647499 10.205 0.990304 10.347 1.34775 10.347H7.65281V16.652C7.65281 17.0095 7.79481 17.3523 8.04756 17.605C8.30031 17.8578 8.64312 17.9998 9.00056 17.9998C9.35801 17.9998 9.70081 17.8578 9.95357 17.605C10.2063 17.3523 10.3483 17.0095 10.3483 16.652V10.347H16.6534C17.0108 10.347 17.3536 10.205 17.6064 9.95222C17.8591 9.69947 18.0011 9.35666 18.0011 8.99922C18.0011 8.64177 17.8591 8.29897 17.6064 8.04622C17.3536 7.79346 17.0108 7.65147 16.6534 7.65147Z"
                fill="#4761E9"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <div class="card-item secInput">
            <p class="card-label">
              <span class="card-item-left">{{ $t('addpool.injection') }}</span>
              <span class="card-item-right">{{ $t('addpool.balance') }}: {{ coinBbalance | formatTLAMBValue }}</span>
            </p>
            <myInput ref="coinBInput" class="card-input" :TokenAmount="coinB"></myInput>
          </div>

          <template v-if="showPrice">
            <div class="info-item info-bg">
              <h5 class="info-title">{{ $t('addpool.Pricefundpool') }}</h5>
              <div class="info-content">
                <div class="info-content-item">
                  <p class="num">{{ price }}</p>
                  <p class="unit">tLAMB per LAMB</p>
                </div>
                <div class="info-content-item">
                  <p class="num">{{ invertprice }}</p>
                  <p class="unit">LAMB per tLAMB</p>
                </div>
                <div class="info-content-item">
                  <p class="num">{{ poolPercent }}%</p>
                  <p class="unit">{{ $t('addpool.ShareofPool') }}</p>
                </div>
              </div>
            </div>
            <div class="token-item info-bg">
              <span class="title">{{ $t('addpool.Ethtransactionfees') }}</span>
              <span class="value">{{ ethformat }}eth ≈ {{ useUsdt }}usdt</span>
            </div>

            <div class="token-item info-bg">
              <span class="title">{{ $t('addpool.Iinjectliquidity') }}</span>
              <span class="value">{{ poolBlance }} LP-{{ coinAsymbol }}-{{ coinBsymbol }}</span>
            </div>
          </template>

          <button @click="getEthAuth" v-if="!ethAddress" class="btn injectBtn">{{ $t('addpool.Linkwallet') }}</button>
          <div v-else>
            <button v-if="showloading" class="btn injectBtn">loading</button>
            <div v-else>
              <button v-if="iscoinANeed" class="btn injectBtn" @click="approveAcoin">
                {{ coinAsymbol }} {{ $t('addpool.approve') }}
              </button>
              <button v-if="iscoinBNeed" class="btn injectBtn" @click="approveBcoin">
                {{ coinBsymbol }} {{ $t('addpool.approve') }}
              </button>

              <button v-if="iscoinANeed == false && iscoinBNeed == false" @click="addliquidity" class="btn injectBtn">
                {{ $t('addpool.Injectliquidity') }}
              </button>
            </div>
          </div>
        </div>
      </card>
    </div>

    <div class="notice-wrapper">
      <div class="notice-content">
        <ul>
          <li>{{ $t('addpool.helpTxt.title1') }}</li>
          <p>{{ $t('addpool.helpTxt.titlep') }}</p>
          <li>{{ $t('addpool.helpTxt.title2') }}</li>
          <p>{{ $t('addpool.helpTxt.titlep2') }}</p>
          <li>
            {{ $t('addpool.helpTxt.title3') }}
            <br />
            <tlambLink />
          </li>
          <p>
            {{ $t('addpool.helpTxt.titlep3') }}
          </p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import tlambLink from '@/components/tlambLink.vue';

import { useTokenbalance, useTokentotalSupply } from '@/contacthelp/Allowances.js';

import { ChainId, Token, Fetcher, Route, TokenAmount, Percent, Router } from '@uniswap/sdk';

import { useNeedApproveInput } from '@/contacthelp/useNeedApprove.js';
import { ROUTER_ADDRESS } from '@/constants/index.js';

import { useApproveCallback } from '@/contacthelp/useApproveCallback.js';
import { useApproveCallbacklamb } from '@/contacthelp/useApproveCallbacklamb.js';

import { INITIAL_ALLOWED_SLIPPAGE } from '@/constants/index.js';
import getTransaction from '@/contacthelp/getTransaction.js';

import { calculateSlippageAmount, getRouterContract, calculateGasMargin } from '@/contacthelp/utils.js';

import { ethusdt, getGasPrice } from '@/contacthelp/ethusdt.js';

import { useApproveCallback as useApprovegas } from '@/contacthelp/useApproveGas.js';
import { useApproveCallbacklamb as useApprovelamb } from '@/contacthelp/useApprovelambgas.js';

import getethProvider from '@/contacthelp/getethProvider.js';

var coinATokenAmount, coinBTokenAmount;
var coinAbalanceO, coinBbalanceO;

export default {
  data() {
    return {
      coinAsymbol: '',
      coinBsymbol: '',
      coinAbalance: '',
      coinBbalance: '',
      price: '',
      invertprice: '',
      poolPercent: '',
      iscoinANeed: '',
      iscoinBNeed: '',
      showloading: false,
      showPrice: false,
      weitousdt: '',
      gasFee: '',
      poolBlance: '0',
    };
  },
  methods: {
    async getEthAuth() {
      try {
        // 请求用户授权
        this.$store.commit('changeOpenethWallet', true);
      } catch (error) {
        // 用户不授权时
        this.$Notice.warning({
          title: this.$t('swap.actions.checkMetaMask'),
        });
        console.error('User denied account access');
      }
    },
    backIndex() {
      this.$router.push(`/pool`);
    },
    async coinA(data) {
      coinATokenAmount = data;
      this.$data.coinAsymbol = data.token.symbol;
      var uresult = await this.getbalance(coinATokenAmount);
      this.$data.coinAbalance = uresult.raw.toString();
      coinAbalanceO = uresult;

      // if (data.equalTo(0)) {

      //   return;
      // }

      if (data.greaterThan(uresult)) {
        this.$Notice.info({
          title: this.$t('addpool.amountcannotgreaterbalance'),
          desc: this.$t('addpool.amountcannotgreaterbalance'),
        });
        this.clearPrise(true);
        return;
      }

      var havedata = await this.calculationBcoinValue(true);
      if (havedata) {
        await this.addliquidityGas();
      }
    },
    async coinB(data) {
      coinBTokenAmount = data;
      this.$data.coinBsymbol = data.token.symbol;
      var uresult = await this.getbalance(coinBTokenAmount);
      this.$data.coinBbalance = uresult.raw.toString();
      coinBbalanceO = uresult;

      // if (data.equalTo(0)) {

      //   return;
      // }

      if (data.greaterThan(uresult)) {
        this.$Notice.info({
          title: this.$t('addpool.amountcannotgreaterbalance'),
          desc: this.$t('addpool.amountcannotgreaterbalance'),
        });
        this.clearPrise(false);
        return;
      }

      var havedata = await this.calculationBcoinValue(false);
      if (havedata) {
        await this.addliquidityGas();
      }
    },
    clearPrise(isa) {
      this.$data.showloading = false;
      this.$data.showPrice = false;
      if (isa) {
        coinATokenAmount = undefined;
        this.$refs.coinBInput.setValue('');
      } else {
        coinBTokenAmount = undefined;
        this.$refs.coinAInput.setValue('');
      }
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
    async getTokenbalance(token, library, account) {
      var library = window.ethersprovider;
      var result = await useTokenbalance(library, account, token);
      console.log(result);

      return result;
    },
    async getTokenTotalSupply(library, account, token) {
      var library = window.ethersprovider;
      var result = await useTokentotalSupply(library, account, token);
      console.log(result);

      return result;
    },
    async checkApprove(amountToApprove) {
      var library = window.ethersprovider;
      var account = this.ethAddress;

      var result = await useNeedApproveInput(account, library, amountToApprove, ROUTER_ADDRESS);

      return result;
    },
    Checktheparameters() {
      var result = false;
      if (coinATokenAmount != undefined && coinBTokenAmount != undefined) {
        if (
          coinATokenAmount.token.address != coinBTokenAmount.token.address &&
          coinATokenAmount.raw.toString() != '0' &&
          coinBTokenAmount.raw.toString() != '0'
        ) {
          if (coinATokenAmount.greaterThan(coinAbalanceO) || coinBTokenAmount.greaterThan(coinBbalanceO)) {
            this.$Notice.info({
              title: this.$t('addpool.amountcannotgreaterbalance'),
              desc: this.$t('addpool.amountcannotgreaterbalance'),
            });
            result = false;
          } else {
            result = true;
          }
        }
      }
      if (result == false) {
        this.$Notice.error({
          title: this.$t('addpool.Enteramountselectassets'),
          desc: this.$t('addpool.Enteramountselectassets'),
        });
      }

      return result;
    },
    async calculationBcoinValue(isCoinA) {
      var resuslt = false;
      if (coinATokenAmount != undefined && coinBTokenAmount != undefined) {
        if (
          coinATokenAmount.token.address != coinBTokenAmount.token.address &&
          (coinATokenAmount.raw.toString() != '0' || coinBTokenAmount.raw.toString() != '0')
        ) {
          try {
            this.$data.showloading = true;
            this.$data.showPrice = false;
            const pair = await Fetcher.fetchPairData(
              coinATokenAmount.token,
              coinBTokenAmount.token,
              getethProvider(coinBTokenAmount.token)
            );
            console.log(pair);
            let route;

            route = new Route([pair], coinATokenAmount.token);

            var price = route.pairs[0].priceOf(coinATokenAmount.token);

            var haveCoinAdata =
              coinATokenAmount && coinATokenAmount.token.symbol != undefined && coinATokenAmount.greaterThan(0);

            var haveCoinBdata =
              coinBTokenAmount && coinBTokenAmount.token.symbol != undefined && coinBTokenAmount.greaterThan(0);

            if (isCoinA == true && haveCoinAdata == false) {
              isCoinA = false;
            }
            if (isCoinA == false && haveCoinBdata == false) {
              isCoinA = true;
            }

            if (isCoinA) {
              var outputBCoinNum = route.pairs[0].priceOf(coinATokenAmount.token).quote(coinATokenAmount);

              this.$refs.coinBInput.setValue(outputBCoinNum.toSignificant(6));
              coinBTokenAmount = outputBCoinNum;
            } else {
              var outputACoinNum = route.pairs[0].priceOf(coinBTokenAmount.token).quote(coinBTokenAmount);
              this.$refs.coinAInput.setValue(outputACoinNum.toSignificant(6));
              coinATokenAmount = outputACoinNum;
            }

            this.$data.price = price.toSignificant(6);
            this.$data.invertprice = price.invert().toSignificant(6);

            //1 读取总额
            //2 读取我的余额
            let poolBlance = await this.getTokenbalance(pair.liquidityToken, window.ethersprovider, this.ethAddress);
            let poolTotal = await this.getTokenTotalSupply(window.ethersprovider, this.ethAddress, pair.liquidityToken);
            var liquidityMinted;

            if (isCoinA) {
              liquidityMinted = pair.getLiquidityMinted(poolTotal, coinATokenAmount, outputBCoinNum);
            } else {
              liquidityMinted = pair.getLiquidityMinted(poolTotal, outputACoinNum, coinBTokenAmount);
            }

            var poolPercentData = liquidityMinted.divide(poolTotal.add(liquidityMinted));
            if (poolPercentData.multiply(10000).lessThan(1)) {
              this.$data.poolPercent = '<0.01';
            } else {
              var poolPercent = poolPercentData.multiply(100).toSignificant(4);

              this.$data.poolPercent = poolPercent;
            }
            this.$data.poolBlance = poolBlance.toSignificant(4);

            var iscoinANeed, iscoinBNeed;

            if (isCoinA) {
              iscoinANeed = await this.checkApprove(coinATokenAmount);
              iscoinBNeed = await this.checkApprove(outputBCoinNum);
            } else {
              iscoinBNeed = await this.checkApprove(coinBTokenAmount);
              iscoinANeed = await this.checkApprove(outputACoinNum);
            }
            this.$data.iscoinANeed = iscoinANeed;
            this.$data.iscoinBNeed = iscoinBNeed;

            this.$data.showloading = false;
            this.$data.showPrice = true;
          } catch (error) {
            this.$data.showloading = false;
            this.$data.showPrice = true;
            this.$Notice.error({
              title: this.$t('addpool.Failedgetinformation'),
            });
          }

          return true;

          // pair.liquidityToken;
        } else {
          //this.clearPrise()
          // this.$Notice.error({
          //   title: "输入金额，并选择不同的资产",
          // });
        }
      } else {
        //this.clearPrise()
        // this.$Notice.error({
        //   title: "输入金额，并选择不同的资产",
        // });
      }
    },
    async approveGas(coinTokenAmount) {
      var library = window.ethersprovider;
      var account = this.ethAddress;
      var spender = ROUTER_ADDRESS;
      var estimatedGasLimit;
      try {
        if (coinTokenAmount.token.symbol == 'tLAMB') {
          estimatedGasLimit = await useApprovegas(account, library, coinTokenAmount, spender);
        } else {
          estimatedGasLimit = await useApprovelamb(account, library, coinTokenAmount, spender);
        }
        console.log('approveGas', estimatedGasLimit);

        var gasPrice = await getGasPrice(library);

        var useWEI = estimatedGasLimit.mul(gasPrice);
        console.log('approveGas1', useWEI);
        var useWei = web3.utils.fromWei(useWEI.toString());

        console.log('approveGas2', useWei);

        this.$data.gasFee = useWei;
      } catch (error) {
        console.log(error);
      }
    },
    async approve(coinTokenAmount) {
      var library = window.ethersprovider;
      var account = this.ethAddress;
      var spender = ROUTER_ADDRESS;
      var result = false;
      this.$data.showloading = true;
      // var
      try {
        if (coinTokenAmount.token.symbol == 'tLAMB') {
          result = await useApproveCallback(account, library, coinTokenAmount, spender);
        } else {
          result = await useApproveCallbacklamb(account, library, coinTokenAmount, spender);
        }
        var txinfo = await getTransaction(result.hash);
        console.log(txinfo);
        if (txinfo.status == false) {
          console.log('status', txinfo);
          throw new Error(this.$t('addpool.approvefailed'));
        }
        this.$Notice.success({
          title: coinTokenAmount.token.symbol + this.$t('addpool.approvesuccess'),
        });

        this.$data.showloading = false;
      } catch (ex) {
        console.log(ex);
        this.$data.showloading = false;
        this.$Notice.error({
          title: coinTokenAmount.token.symbol + this.$t('addpool.approveabnormal'),
          desc: error.message,
        });
      }
      return result;
    },
    async approveAcoin() {
      if (this.Checktheparameters() == false) {
        return;
      }
      var result = await this.approve(coinATokenAmount);
      if (result) {
        var iscoinANeed = await this.checkApprove(coinATokenAmount);
        this.$data.iscoinANeed = iscoinANeed;
      }
    },
    async approveBcoin() {
      if (this.Checktheparameters() == false) {
      }
      var result = await this.approve(coinBTokenAmount);
      if (result) {
        var iscoinBNeed = await this.checkApprove(coinBTokenAmount);
        this.$data.iscoinBNeed = iscoinBNeed;
      }
    },
    async addliquidityGas() {
      console.log('*****');
      if (this.Checktheparameters() == false) {
        return;
      }

      if (this.$data.iscoinANeed == true || this.$data.iscoinBNeed == true) {
        return await this.approveGas(coinATokenAmount);
      }

      const allowedSlippage = INITIAL_ALLOWED_SLIPPAGE;

      const amountsMin = {
        CURRENCY_A: calculateSlippageAmount(coinATokenAmount, allowedSlippage)[0],
        CURRENCY_B: calculateSlippageAmount(coinBTokenAmount, allowedSlippage)[0],
      };
      var account = this.ethAddress; //收件人是不是也应该是我自己
      var blockTime = await this.getTime();
      // 20 minutes, denominated in seconds
      const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;

      var deadline = blockTime + DEFAULT_DEADLINE_FROM_NOW;

      var nowChainId = this.ethChainID;

      var provider = window.ethersprovider;

      const contract = getRouterContract(nowChainId, provider, account);

      var args = [
        coinATokenAmount.currency.address,
        coinBTokenAmount.currency.address,
        coinATokenAmount.raw.toString(),
        coinBTokenAmount.raw.toString(),
        amountsMin['CURRENCY_A'].toString(),
        amountsMin['CURRENCY_B'].toString(),
        account,
        web3.utils.asciiToHex(deadline + ''),
      ];

      console.log('获取gas的参数', args);

      var estimatedGasLimit = await contract.estimateGas.addLiquidity(...args, {});

      console.log(estimatedGasLimit);

      var gasPrice = await getGasPrice(provider);

      var useWEI = estimatedGasLimit.mul(gasPrice);
      var useWei = web3.utils.fromWei(useWEI.toString());

      this.$data.gasFee = useWei;
    },
    async addliquidity() {
      if (this.Checktheparameters() == false) {
        return;
      }
      try {
        this.$data.showloading = true;

        const allowedSlippage = INITIAL_ALLOWED_SLIPPAGE;

        const amountsMin = {
          CURRENCY_A: calculateSlippageAmount(coinATokenAmount, allowedSlippage)[0],
          CURRENCY_B: calculateSlippageAmount(coinBTokenAmount, allowedSlippage)[0],
        };
        var account = this.ethAddress; //收件人是不是也应该是我自己
        var blockTime = await this.getTime();
        // 20 minutes, denominated in seconds
        const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;

        var deadline = blockTime + DEFAULT_DEADLINE_FROM_NOW;

        var nowChainId = this.ethChainID;

        var provider = window.ethersprovider;

        const contract = getRouterContract(nowChainId, provider, account);

        var args = [
          coinATokenAmount.currency.address,
          coinBTokenAmount.currency.address,
          coinATokenAmount.raw.toString(),
          coinBTokenAmount.raw.toString(),
          amountsMin['CURRENCY_A'].toString(),
          amountsMin['CURRENCY_B'].toString(),
          account,
          web3.utils.asciiToHex(deadline + ''),
        ];

        var estimatedGasLimit = await contract.estimateGas.addLiquidity(...args, {});

        console.log(estimatedGasLimit);
        var result = await contract.addLiquidity(...args, {
          ...{},
          gasLimit: calculateGasMargin(estimatedGasLimit),
        });
        console.log(result);
        this.$Notice.info({
          title: this.$t('addpool.Transactionsent'),
        });

        var txinfo = await getTransaction(result.hash);
        if (txinfo.status == false) {
          console.log('status', txinfo);
          throw new Error(this.$t('addpool.transactionfailed'));
        }
        this.$Notice.success({
          title: this.$t('addpool.addPoolOK'),
          desc:this.$t('addpool.addPoolOK'),
        });
        await this.Refreshbalance();
        this.$data.showloading = false;
        console.log(txinfo);
        this.clearData();
      } catch (error) {
        this.$Notice.error({
          title: this.$t('addpool.addPoolabnormal'),
          desc: error.message,
        });
        this.$data.showloading = false;
      }
    },
    clearData() {
      this.$data.showloading = false;
      this.$data.showPrice = false;

      coinATokenAmount = new TokenAmount(coinATokenAmount.token, web3.utils.toWei('0', 'ether'));
      this.$refs.coinBInput.setValue('');

      coinBTokenAmount = new TokenAmount(coinBTokenAmount.token, web3.utils.toWei('0', 'ether'));
      this.$refs.coinAInput.setValue('');
      this.$data.gasFee = '';
      this.$data.poolBlance = '0';
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
    async Refreshbalance() {
      var uresult = await this.getbalance(coinATokenAmount);
      this.$data.coinAbalance = uresult.raw.toString();

      var uresult = await this.getbalance(coinBTokenAmount);
      this.$data.coinBbalance = uresult.raw.toString();
    },
  },
  beforeDestroy() {
    coinATokenAmount = undefined;
    coinBTokenAmount = undefined;
  },
  components: {
    card: () => import('@components/card.vue'),
    myInput: () => import('@components/myInput.vue'),
    tlambLink,
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
  async mounted() {
    try {
      this.$data.weitousdt = await ethusdt();
    } catch (error) {
      this.$Notice.info({
        title: this.$t('addpool.Readdataexception'),
      });
    }
  },
};
</script>

<style lang="less" scoped>
.add-pool-wrapper {
  width: 100%;
  // margin: 0 auto;
  .card-main {
    width: 40%;
    margin: 0 auto;
    margin-top: 160px;
    .card-container {
      .addContent-wrapper {
        width: 100%;
        text-align: center;
        .card-label {
          overflow: hidden;
          margin-top: 20px;
          margin-bottom: 10px;
          .card-item-left {
            float: left;
            font-size: 14px;
            line-height: 20px;
            color: #000000;
          }
          .card-item-right {
            float: right;
            font-size: 12px;
            line-height: 17px;
            color: #5e6d82;
          }
        }
        .addSymbol {
          margin-top: 15px;
        }
        .info-item {
          margin-top: 25px;
          .info-title {
            text-align: left;
            font-size: 12px;
            line-height: 17px;
            color: #000000;
          }
          .info-content {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .info-content-item {
              margin-top: 10px;
              font-size: 12px;
              padding: 5px;
              .num {
                margin-bottom: 5px;
              }
            }
          }
        }

        .token-item {
          margin-top: 10px;
          overflow: hidden;
          span {
            display: inline-block;
          }
          .title {
            float: left;
            font-size: 12px;
            line-height: 17px;
            color: #000000;
          }
          .value {
            float: right;
            font-size: 12px;
            line-height: 17px;
            color: #5e6d82;
          }
        }

        .card-input {
          width: 100%;
          border: 1px solid #d3dce6;
        }

        .injectBtn {
          margin-top: 20px;
          width: 100%;
          height: 42px;
        }
      }
    }
  }
}

.notice-wrapper {
  margin-top: 50px;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 50px;
  font-size: 12px;
  line-height: 23px;
  color: #dfdfdf;
  li {
    margin-top: 20px;
  }
  a {
    color: yellow;
  }
}
</style>