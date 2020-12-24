import gastoken  from  "@/constants/gastoken.json"

import { getNetwork } from '@ethersproject/networks'
import { getDefaultProvider } from '@ethersproject/providers'

import getethProvider from './getethProvider.js'

import {
    ChainId,
    Token,
    Fetcher,
    Route,
    TokenAmount,
    Router,
  } from "@uniswap/sdk";

export async function  ethusdt(){
    var USDT = gastoken.tokens[0]
    var WETH = gastoken.tokens[1];

    const USDTcoin = new Token(
        USDT.chainId,
        USDT.address,
        USDT.decimals,
        USDT.symbol
      );

    const WETHcoin = new Token(
        WETH.chainId,
        WETH.address,
        WETH.decimals,
        WETH.symbol
      );
  

  
  
    const pair = await Fetcher.fetchPairData(
        USDTcoin,
        WETHcoin,
        getethProvider(USDTcoin)
      );
      console.log(pair);
      const route = new Route([pair], WETHcoin);

      var price = route.pairs[0].priceOf(WETHcoin);
      console.log('eth to usdt',price.toSignificant(6)) ;
      return price.toSignificant(6);

}

export async function getGasPrice(provider){
  var data = await provider.getGasPrice();
  

  
  return data.toString()

}