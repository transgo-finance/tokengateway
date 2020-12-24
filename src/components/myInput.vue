<template>
  <div class="card-item-input">
    <input @keyup="setinput"  v-model="userinput" class="input" type="text" :placeholder="$t('swap.enterthequantity')" />
    <select @change="setinput"  v-model="selectCoin"  name="coin" class="coin" id="coin">
      <option    value="">{{$t('swap.pleasechoose')}}</option>
      <option v-for="item in tokenList"   :value="item">{{item.symbol}}</option>

    </select>

  </div>
</template>

<script>
import token from '@/constants/token.json'
import {
  ChainId,
  Token,
  TokenAmount,

} from "@uniswap/sdk";
import web3 from 'web3'
var debounce = require('debounce');
//TokenAmount

import  {isNum}  from "@/contacthelp/utils.js";
import { mapState } from 'vuex';


export default {
  props: {
     TokenAmount:{
        type: Function,
        default: ()=>{}
     }
  },
  data() {
    return {
      userinput:'',
      selectCoin:'',
      chainID:3
    }
  },
  mounted() {


  },
  methods: {
    setinput: debounce(function(e){

      // console.log(this.$data.userinput,this.$data.selectCoin)
      // return;
      var num ='0';
      if(this.$data.selectCoin==''){
        return ;
      }
      if(this.$data.userinput!=''){
        num = this.$data.userinput;
      }
      if(isNum(num)== false){
         this.$Notice.info({
                    title: this.$t('swapinput.beanumber')

                });
        return

      }
      const coin = new Token(
        this.$data.selectCoin.chainId,
        this.$data.selectCoin.address,
        18,
        this.$data.selectCoin.symbol
      );

      var inputAmount = new TokenAmount(
        coin,
        web3.utils.toWei(num, "ether")
      );
      // console.log(inputAmount)
      this.$props.TokenAmount(inputAmount)



    },500),
    setValue(data){
      this.$data.userinput=data
    }
  },
  computed: {
    tokenList(){

      var chainID=this.ethChainID;
      var list=[]
       token.tokens.forEach(element => {
        if(element.chainId==chainID){
          list.push(element)
        }

      });

      return list
    },
    ...mapState(['ethChainID']),

  },
};
</script>

<style lang="less" scoped>
.card-item-input {
  border: 1px solid #d3dce6;
  // padding: 6px 10px;
  // width: 303px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .input {
    border: none;
    outline: none;
    padding-left: 10px;
    width: 70%;
    font-size: 12px;
    // height: 32px;
  }
  .coin {
    outline: none;
    border: none;
    // width: 20%;
    font-size: 12px;
    // height: 32px;
  }
}
</style>