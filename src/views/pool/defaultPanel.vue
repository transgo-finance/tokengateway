<template>
<div class="card-main">
  <card class="card-container" :title="$t('pool.pageTitle1')">

    <div v-if="showloading" class="demo-spin-container">
        <Spin fix></Spin>
    </div>
    <div v-for="item in List" class="pairToken-wrapper" v-if="haveData">
      <p class="token">LP-{{item.tokenA.symbol}}—{{item.tokenB.symbol}}</p>
      <button @click="remove(item)" class="btn openBtn">{{$t('pool.remove')}}</button>
      <p class="balance">{{$t('pool.balance')}} : {{item.balance}}</p>
    </div>

    <div class="content-wrapper">
      <svg v-if="haveData==false&&showloading==false"  class="noData" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
          fill="#F4F8FD"
        />
        <path
          d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
          stroke="#D3DCE6"
        />
        <ellipse cx="30" cy="43" rx="20" ry="5" fill="#E9F0F7" />
        <g filter="url(#filter0_d)">
          <path d="M45.0293 20.4773L28.0146 18V27.8239L45.0293 29.7741V20.4773Z" fill="#C0CCDA" />
          <path d="M14.4029 21.2152L28.0146 18V29.1538L14.4029 32.369V21.2152Z" fill="#E9F0F7" />
          <path d="M30.282 24.9331L45.0293 20.4772V41.5441L30.282 46V24.9331Z" fill="white" />
          <path d="M14.4029 21.2151L30.282 24.9331V45.8864L14.4029 41.6658V21.2151Z" fill="white" />
          <path d="M30.282 24.9006L14.4029 21.2151L11 28.651L27.4469 32.8717L30.282 24.9006Z" fill="#F4F8FD" />
          <path d="M30.282 24.9331L45.0293 20.4772L49 27.9131L34.8205 32.9892L30.282 24.9331Z" fill="#E9F0F7" />
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="4"
            y="15"
            width="46"
            height="36"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="-3" dy="1" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.662745 0 0 0 0 0.74902 0 0 0 0.12 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>

      <div class="btn-wrapper">
        <button class="btn add" @click="showAdd">{{$t('pool.Addliquidity')}}</button>
      </div>
    </div>

  </card>
</div>
</template>

<script>
import { mapState } from 'vuex';

import readPoolList from './readPoolList.js'

export default {
  data() {
    return {
      haveData: false,
      List:[],
      showloading:false
    }
  },
  components: {
    card: () => import('@components/card.vue'),
    myInput: () => import('@components/myInput.vue'),
  },
  methods: {
    showAdd() {
      this.$router.push(`/pool/add`);
    },
    remove(item) {
      //{{item.tokenA.symbol}}—{{item.tokenB.symbol}}
      var addrA = item.tokenA.address;
      var addrB = item.tokenB.address;

      this.$router.push(`/pool/remove/${addrA}/${addrB}`);
      
    },
    async getList(){
      var  chainID = this.ethChainID;
      var library = window.ethersprovider;
      var  account = this.ethAddress ;
      if(this.ethAddress== undefined){
        return ;
      }
      this.$data.showloading = true;
      try {
        var liquidityTokenList = await  readPoolList(chainID,library, account);
      var _this=this;
      if(liquidityTokenList&&liquidityTokenList.length>0){
        _this.$data.List=[]
        liquidityTokenList.forEach((item)=>{
          _this.$data.List.push({
            tokenA:item.tokenAmounts[0].token,
            tokenB:item.tokenAmounts[1].token,
            address:item.liquidityToken.address,
            balance:item.userbalance.toSignificant(6)
          })
        })
        this.$data.haveData=true;
        
      }else{
        this.$data.haveData=false;
      }
      this.$data.showloading = false;

      } catch (error) {
        this.$data.showloading = false;
        this.$Notice.warning({
                    title: '读取数据异常'
                    
                })
      }

    }
  },
 async mounted() {
   console.log('*****')
   if(this.ethChainID!=''&&this.ethAddress!=''){
        this.$data.showloading = true;

        this.getList();

      }else{
        // this.$Notice.warning({
        //             title: '请链接以太坊钱包'
                    
        //         })
      }




  },
  computed: {
    ...mapState(['ethAddress', 'lambdaAddress','ethChainID']),
  },
  watch: {
    ethAddress:function(){
      if(this.ethChainID!=''&&this.ethAddress!=''){
        this.$data.showloading = true;
        this.getList();

      }
    }
  },

};
</script>

<style lang="less" scoped>
.card-container {
  width: 100%;
  .pairToken-wrapper {
    padding: 20px 0px 20px 20px;
    margin-top: 18px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: sapce-between;
    flex-wrap: wrap;
    align-items: center;
    background: #f9f9fa;
    border-radius: 10px;
    .token {
      width: 80%;
      font-size: 16px;
      line-height: 22px;
      color: #000000;
    }
    .openBtn {
      padding: 8px 16px;
    }
    .balance {
      margin-top: 10px;
      width: 100%;
    }
  }
  .content-wrapper {
    // min-height: 350px;
    text-align: center;
    .noData {
      margin-top: 100px;
    }
    .btn-wrapper {
      margin-top: 120px;
      width: 100%;
      .add {
        width: 100%;
        height: 42px;
      }
    }
  }
}

    .demo-spin-container{
    	display: inline-block;
        width: 100%;
        height: 100px;
        position: relative;
        // border: 1px solid #eee;
    }
    .card-main {
    width: 40%;
    margin: 0 auto;
    margin-top: 160px;
  }
</style>