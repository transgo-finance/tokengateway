<template>
<div>
  <div class="card-main">
    <div class="remove-wrapper">
      <card class="card-container" :configTitle="false">
        <div class="title-wrapper" @click="backIndex">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.78447 11.1615L14.2999 5.64609L16.1384 7.48457L10.6229 13L16.1384 18.5154L14.2999 20.3539L8.78446 14.8385L6.94599 13L8.78447 11.1615Z"
              fill="#778CA2"
            />
          </svg>

          <span class="title">{{$t('Removeliquidity.title')}}</span>
        </div>

        <div class="input-wrapper">
          <p class="card-label">
            <span class="card-item-left">{{$t('Removeliquidity.Amount')}}</span>
            <span class="card-item-right">{{ balance }}</span>
          </p>
          <div class="card-input">
            <input
              type="text"
              v-model="removeRate"
              class="input"
              :placeholder="$t('Removeliquidity.placeholderremovalratio')"
            />
          </div>
        </div>

        <div class="quickInput-wrapper">
          <span class="label">{{$t('Removeliquidity.Quickinput')}}</span>
          <span
            @click="quickInput(20)"
            class="input-item"
            :class="[removeRate === 20 ? 'active-span' : '']"
            >20%</span
          >
          <span
            @click="quickInput(50)"
            class="input-item"
            :class="[removeRate === 50 ? 'active-span' : '']"
            >50%</span
          >
          <span
            @click="quickInput(60)"
            class="input-item"
            :class="[removeRate === 60 ? 'active-span' : '']"
            >60%</span
          >
          <span
            @click="quickInput(75)"
            class="input-item"
            :class="[removeRate === 75 ? 'active-span' : '']"
            >75%</span
          >
          <span
            @click="quickInput(100)"
            class="input-item"
            :class="[removeRate === 100 ? 'active-span' : '']"
            >{{$t('Removeliquidity.All')}}</span
          >
        </div>

        <div class="info-bg info-wrapper" v-if="showdetails">
          <p class="info-title">{{$t('Removeliquidity.willreceive')}}</p>
          <p class="info-label">
            <span class="info-name">{{ coinAsymbol }}</span>
            <span class="info-value">{{ acceptAToken }}</span>
          </p>
          <p class="info-label">
            <span class="info-name">{{ coinBsymbol }}</span>
            <span class="info-value">{{ acceptBToken }}</span>
          </p>
        </div>

        <div class="info-bg price-wrapper" v-if="priseA && priseB">
          <div class="price-content info-label">
            <span class="price-title info-name">{{$t('Removeliquidity.Price')}}</span>
            <span class="price-value info-value"
              >1{{ coinAsymbol }} ={{ priseA }} {{ coinBsymbol }}</span
            >
            <span class="price-value mr10 info-value"
              >1{{ coinBsymbol }} ={{ priseB }}{{ coinAsymbol }}</span
            >
          </div>
          <div v-if="gasFee" class="price-content info-label">
            <span class="price-title info-name">{{$t('Removeliquidity.transactionfees')}}</span>
            <span class="price-value info-value"
              >
              {{ethformat}}eth ≈ {{useUsdt}}usdt </span>
            
          </div>
        </div>

        <div class="btn-wrapper">
          <button @click="getEthAuth" v-if="ethAddress==''"  class="btn remove">{{$t('Removeliquidity.Linkwallet')}} </button>
          <div v-else>
              <button v-if="showloading" class="btn remove">loading</button>
              <div v-else>
                <button v-if="needApprove" class="btn remove" @click="makeApprove">
                  {{$t('Removeliquidity.approve')}}
                </button>
                <button v-else class="btn remove" @click="remove = true">
                  {{$t('Removeliquidity.btntitle')}}
                </button>

                
              </div>
          </div>
        </div>
      </card>

      <div class="modal-wrapper">
        <Modal v-model="remove" @on-ok="removePool">
          <p class="modal-header" slot="header">{{$t('Removeliquidity.suretoremoveliquidity')}}</p>
          <p class="modal-body">
           {{$t('Removeliquidity.suretoremoveliquidityDescription')}}
          </p>
        </Modal>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";
import { findToken, getTokenbalance } from "./readPoolList.js";

import { useTokentotalSupply } from "@/contacthelp/Allowances";

import {
  ChainId,
  Token,
  Fetcher,
  Route,
  TokenAmount,
  Percent,
  Router,
} from "@uniswap/sdk";

import { usePairContract } from "@/contacthelp/useContract.js";
import { ROUTER_ADDRESS } from "@/constants";
import { splitSignature } from "@ethersproject/bytes";
import {
  calculateGasMargin,
  getRouterContract,
  calculateSlippageAmount,
} from "@/contacthelp/utils.js";

import { INITIAL_ALLOWED_SLIPPAGE } from "@/constants/index.js";

import getTransaction from "@/contacthelp/getTransaction.js";

import  {isNum}  from "@/contacthelp/utils.js";

import  {ethusdt,getGasPrice}  from "@/contacthelp/ethusdt.js";

import getethProvider from '@/contacthelp/getethProvider.js'

var pair, userTokenbalance;
var aTokenData, bTokenData;
var currencyAmountA, currencyAmountB;

var userTokenbalance, liquidityAmount;
var pairContract;

export default {
  data() {
    return {
      removeRate: "",
      remove: false,
      balance: "",
      priseA: "",
      priseB: "",
      coinAsymbol: "",
      coinBsymbol: "",
      coinAToken: "",
      coinBToken: "",
      acceptAToken: "",
      acceptBToken: "",
      needApprove: true,
      SignatureData: null,
      spinShow: false,
      showloading: false,
      showdetails: false,
      weitousdt:'',
      gasFee:''
    };
  },
  components: {
    card: () => import("@components/card.vue"),
  },
  methods: {
   async removePool() {
      if(this.checksendparameter()==false){
        return;
      }
      try {
        await this.sendTx();
      
        await this.Refreshbalance();
        this.clearState();
        this.$data.showloading = false;
      } catch (error) {
        this.$Notice.error({
          title: this.$t('Removeliquidity.Programexception'),
          desc: error.message
        });
        this.$data.showloading = false;
        this.clearState();
        
        
      }
      
    },
    backIndex() {
      this.$router.push(`/pool`);
    },
    quickInput(val) {
      this.removeRate = val;
    },
    Coin(addr) {
      console.log("Coin");

      var coin = findToken(this.ethChainID, addr);
      return coin;
    },
    checkparameter(){
      if(userTokenbalance.equalTo(0)){
        this.$Notice.info({
          title: this.$t('Removeliquidity.notfindpoll'),
        });
        return false;
      }
      if(pair==undefined||liquidityAmount==undefined){
        this.$Notice.info({
          title: this.$t('Removeliquidity.enterratioremoved'),
        });
        return false;
      }

    },
   async makeApprove(){
      try {
        await this.localApprove();
        
        
      } catch (error) {
        this.$Notice.error({
            title: this.$t('Removeliquidity.approveabnormal'),
            desc: error.message
          });
      this.$data.needApprove = true;
      this.$data.showloading = false;
        
      }

    },
    async localApprove() {
      var library = window.ethersprovider;
      var account = this.ethAddress;
      var chainId = this.ethChainID;
      if(this.checkparameter()==false){
        return;
      }

      this.$data.showloading = true;

      const nonce = await pairContract.nonces(account);
      var lasttime = await this.getTime();
      const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;
      var deadline = lasttime + DEFAULT_DEADLINE_FROM_NOW;
      const EIP712Domain = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ];
      const domain = {
        name: "Uniswap V2",
        version: "1",
        chainId: chainId,
        verifyingContract: pair.liquidityToken.address,
      };
      const Permit = [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ];
      const message = {
        owner: account,
        spender: ROUTER_ADDRESS,
        value: liquidityAmount.raw.toString(),
        nonce: nonce.toHexString(),
        deadline: deadline,
      };
      const data = JSON.stringify({
        types: {
          EIP712Domain,
          Permit,
        },
        domain,
        primaryType: "Permit",
        message,
      });
      var _this = this;

      library
        .send("eth_signTypedData_v4", [account, data])
        .then(splitSignature)
        .then((signature) => {
          _this.$data.SignatureData = {
            v: signature.v,
            r: signature.r,
            s: signature.s,
            deadline: deadline,
          };
          _this.$data.needApprove = false;
          _this.$data.showloading = false;
        })
        .catch((error) => {
          _this.$data.needApprove = true;
          _this.$data.showloading = false;
          console.log(error);
          this.$Notice.error({
            title: _this.$t('Removeliquidity.approveabnormal'),
            desc: error.message
          });
        });
    },
    checksendparameter(){
      if(currencyAmountA== undefined||currencyAmountB== undefined||
      this.$data.SignatureData== ''
      ){
        this.$Notice.info({
          title: this.$t('Removeliquidity.Datamissing'),
        });
        return false;
      }

    },
    clearState(){
      currencyAmountA = undefined;
      currencyAmountB = undefined ;
      liquidityAmount = undefined ;

      this.$data.acceptAToken = ''
      this.$data.acceptBToken = ''
      this.$data.SignatureData = '';
      this.$data.showdetails = false;
      this.$data.needApprove = true;
      this.$data.removeRate =''
      this.$data.gasFee = ''

    },
   async sendTxGas(){
      var library = window.ethersprovider;
      var account = this.ethAddress;
      var chainId = this.ethChainID;
      if(this.checksendparameter()==false){
        return;
      }

      const router = getRouterContract(chainId, library, account);
      //
      const amountsMin = {
        ["CURRENCY_A"]: calculateSlippageAmount(
          currencyAmountA,
          INITIAL_ALLOWED_SLIPPAGE
        )[0],
        ["CURRENCY_B"]: calculateSlippageAmount(
          currencyAmountB,
          INITIAL_ALLOWED_SLIPPAGE
        )[0],
      };

      var signatureData = this.$data.SignatureData;
      if(signatureData==''){
        return;
      }

      var methodName = "removeLiquidityWithPermit";
      var args = [
        currencyAmountA.token.address,
        currencyAmountB.token.address,
        liquidityAmount.raw.toString(),
        amountsMin["CURRENCY_A"].toString(),
        amountsMin["CURRENCY_B"].toString(),
        account,
        signatureData.deadline,
        false,
        signatureData.v,
        signatureData.r,
        signatureData.s,
      ];
      var safeGasEstimate = await router.estimateGas[methodName](...args);
      var gasPrice = await getGasPrice(library)

      var useWEI =   safeGasEstimate.mul(gasPrice);
      var useWei = web3.utils.fromWei(useWEI.toString()) 

      this.$data.gasFee = useWei ;


    },
    async sendTx() {
      var library = window.ethersprovider;
      var account = this.ethAddress;
      var chainId = this.ethChainID;
      if(this.checksendparameter()==false){
        return;
      }

      this.$data.showloading = true;

      const router = getRouterContract(chainId, library, account);
      //
      const amountsMin = {
        ["CURRENCY_A"]: calculateSlippageAmount(
          currencyAmountA,
          INITIAL_ALLOWED_SLIPPAGE
        )[0],
        ["CURRENCY_B"]: calculateSlippageAmount(
          currencyAmountB,
          INITIAL_ALLOWED_SLIPPAGE
        )[0],
      };

      var signatureData = this.$data.SignatureData;

      var methodName = "removeLiquidityWithPermit";
      var args = [
        currencyAmountA.token.address,
        currencyAmountB.token.address,
        liquidityAmount.raw.toString(),
        amountsMin["CURRENCY_A"].toString(),
        amountsMin["CURRENCY_B"].toString(),
        account,
        signatureData.deadline,
        false,
        signatureData.v,
        signatureData.r,
        signatureData.s,
      ];
      var safeGasEstimate = await router.estimateGas[methodName](...args);

      var result = await router[methodName](...args, {
        gasLimit: calculateGasMargin(safeGasEstimate),
      });
      console.log(result);
      this.$Notice.info({
        title: this.$t('Removeliquidity.Transactionsent'),
      });
      var txinfo = await getTransaction(result.hash);
      console.log(txinfo);
      if (txinfo.status == false) {
        console.log("status", txinfo);
        throw new Error(this.$t('Removeliquidity.transactionfailed'));
      }
      this.$Notice.success({
        title: this.$t('Removeliquidity.Successfultransaction'),
      });

      
    },
    async inti(addrA, addrB) {
      this.$data.spinShow = true;
      var coinA = this.Coin(addrA);
      var coinB = this.Coin(addrB);

      const coinAToken = new Token(
        coinA.chainId,
        coinA.address,
        coinA.decimals,
        coinA.symbol
      );
      this.$data.coinAToken = coinAToken;

      const coinBToken = new Token(
        coinB.chainId,
        coinB.address,
        coinB.decimals,
        coinB.symbol
      );

      this.$data.coinBToken = coinBToken;

      pair = await Fetcher.fetchPairData(coinAToken, coinBToken,getethProvider(coinBToken));

      console.log(pair);

      var library = window.ethersprovider;
      var account = this.ethAddress;
      userTokenbalance = await getTokenbalance(
        pair.liquidityToken,
        library,
        account
      );

      this.$data.balance = userTokenbalance.toSignificant(6);

      var route = new Route([pair], coinAToken);

      var price = route.pairs[0].priceOf(coinAToken);

      this.$data.priseA = price.toSignificant(6);
      this.$data.priseB = price.invert().toSignificant(6);

      this.$data.coinAsymbol = coinA.symbol;
      this.$data.coinBsymbol = coinB.symbol;

      var totalSupply = await useTokentotalSupply(
        library,
        account,
        pair.liquidityToken
      );

      aTokenData = pair.getLiquidityValue(
        coinAToken,
        totalSupply,
        userTokenbalance,
        false
      );
      bTokenData = pair.getLiquidityValue(
        coinBToken,
        totalSupply,
        userTokenbalance,
        false
      );

      console.log(aTokenData, bTokenData);
      pairContract = usePairContract(
        library,
        account,
        pair.liquidityToken.address
      );
    },
   async Refreshbalance(){

      var library = window.ethersprovider;
      var account = this.ethAddress;
      var chainId = this.ethChainID;

      pair = await Fetcher.fetchPairData(this.$data.coinAToken, this.$data.coinBToken,getethProvider(this.$data.coinBToken));
      
      userTokenbalance = await getTokenbalance(
        pair.liquidityToken,
        library,
        account
      );
      
      this.$data.balance = userTokenbalance.toSignificant(6);
      var totalSupply = await useTokentotalSupply(
        library,
        account,
        pair.liquidityToken
      );

      aTokenData = pair.getLiquidityValue(
        this.$data.coinAToken,
        totalSupply,
        userTokenbalance,
        false
      );
      bTokenData = pair.getLiquidityValue(
        this.$data.coinBToken,
        totalSupply,
        userTokenbalance,
        false
      );


    },
    async getTime() {
      let web3 = new Web3(window.ethereum);

      return new Promise((resolve, reject) => {
        web3.eth.getBlock("latest", (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data.timestamp);
          }
        });
      });
    },
    async getEthAuth() {
      try {
        // 请求用户授权
        this.$store.commit('changeOpenethWallet', true);
      } catch (error) {
        // 用户不授权时
        this.$Notice.warning({
                    title: this.$t('Removeliquidity.checkMetaMaskinstalled')
                    
                })
        console.error('User denied account access');
      }
    },
   async setUP(){
      var addrA = this.$route.params.addrA;
      var addrB = this.$route.params.addrB;
      var _this = this;
      try {
        await this.inti(addrA, addrB);
        this.$data.spinShow = false;
        this.$data.weitousdt = await ethusdt(); 
        
      } catch (error) {
        this.$data.spinShow = false;
        this.$Notice.warning({
                    title: this.$t('Removeliquidity.Abnormalreadingdata')
                    
                })
      }
    
      
    }
  },
  async mounted() {
    console.log("页面加载");
    if(this.ethChainID!=''&&this.ethAddress!=''){
        this.setUP();
        
    }
  },
  computed: {
    ...mapState(["ethAddress", "lambdaAddress", "ethChainID"]),
    useUsdt(){
      return  (Number(this.$data.gasFee)*Number(this.$data.weitousdt)).toFixed(4)  ;
    },
    ethformat(){
      return Number(this.$data.gasFee).toFixed(4) 
    }
  },
  watch: {
    removeRate: function (removeRate) {
      liquidityAmount=undefined;
      if(removeRate == ""){
        return
      }
      
      if (isNum(removeRate)==false) {
        this.$data.showdetails = false;
        this.$Notice.info({
          title: this.$t('Removeliquidity.Entervalueerror'),
          desc: this.$t('Removeliquidity.Entervalueerror'),
        });
        return;
      }
      
      this.$data.needApprove = true;
      let percentToRemove = new Percent(removeRate, "100");
      if( percentToRemove.greaterThan(1)||percentToRemove.equalTo(0)  ){
        this.$data.showdetails = false;
        percentToRemove = undefined;
        this.$Notice.info({
          title: this.$t('Removeliquidity.Entervalueerror'),
          desc: this.$t('Removeliquidity.Entervalueerror'),
        });
        return;
      }

      if(userTokenbalance.equalTo(0)){
        this.$Notice.info({
          title: this.$t('Removeliquidity.notfindpoll'),
          desc:this.$t('Removeliquidity.notfindpoll'),
        });
        return ;
      }



      var aCoinf = percentToRemove.multiply(aTokenData.raw);

      currencyAmountA = new TokenAmount(this.$data.coinAToken, aCoinf.quotient);

      var bCoinf = percentToRemove.multiply(bTokenData.raw);

      currencyAmountB = new TokenAmount(this.$data.coinBToken, bCoinf.quotient);

      var tempAmount = percentToRemove.multiply(userTokenbalance.raw);
      liquidityAmount = new TokenAmount(
        pair.liquidityToken,
        tempAmount.quotient
      );

      console.log(currencyAmountA, currencyAmountB, liquidityAmount);

      this.$data.acceptAToken = currencyAmountA.toSignificant(6);
      this.$data.acceptBToken = currencyAmountB.toSignificant(6);
      this.$data.showdetails = true;
    },
    ethAddress:function(){
      if(this.ethChainID!=''&&this.ethAddress!=''){
        this.setUP();
      }
    },
    SignatureData:function(){
      if(this.$data.SignatureData==''){
        return 
      }
        this.sendTxGas()
      
    }
  },
};
</script>

<style lang="less" scoped>
.remove-wrapper {
  .input {
    height: 32px;
    width:90%;
  }
  .quickInput-wrapper {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    span {
      display: inline-block;
    }
    .label {
      font-size: 12px;
      line-height: 17px;
      color: #000000;
    }
    .input-item {
      padding: 6px 12px;
      background-color: #ececec;
      border-radius: 16px;
      cursor: pointer;
    }
  }
  .info-wrapper {
    margin-top: 30px;
    .info-title {
      font-size: 12px;
      line-height: 17px;
      color: #000000;
    }
  }
  .price-wrapper {
    margin-top: 20px;
    .price-content {
      .price-title {
        font-size: 12px;
        line-height: 17px;
        color: #000000;
      }
    }
  }

  .btn-wrapper {
    margin-top: 40px;
    width: 100%;
    .remove {
      width: 100%;
      height: 42px;
      margin-top: 10px;
    }
  }
}

.active-span {
  background-color: #4761e9 !important;
  color: #fff;
}

.card-main {
    width: 40%;
    margin: 0 auto;
    margin-top: 160px;
  }
  
</style>