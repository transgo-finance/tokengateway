import token from "@/constants/token.json";
import { ChainId, Token, TokenAmount, Fetcher } from "@uniswap/sdk";

import { useTokenbalance } from "@/contacthelp/Allowances.js";
import getethProvider from '@/contacthelp/getethProvider.js'

function tokenList(chainID) {
    var list = [];
    token.tokens.forEach((element) => {
        if (element.chainId == chainID) {
            list.push(element);
        }
    });

    return list;
}

export function findToken(chainID,address){
    var list =  tokenList(chainID) ;
    var result;
    list.forEach((item)=>{
        if(item.address == address ){
            result = item;
        }
    })

    return result

}



function addTOPairList(coinA, coinB, pairList) {
    pairList.forEach((Item) => {
        if (
            Item.coinA.symbol != coinA.symbol &&
            Item.coinB.symbol != coinB.symbol &&
            Item.coinA.symbol != coinB.symbol &&
            Item.coinB.symbol != coinA.symbol
        ) {
            pairList.push({
                coinA,
                coinB,
            });
        }
    });

    if (pairList.length == 0) {
        pairList.push({
            coinA,
            coinB,
        });
    }

    return pairList ;
}
async function getPairs(pairList) {
    var userpairList = [] ;
    for (let index = 0; index < pairList.length; index++) {
      const element = pairList[index];
      const TokenA = new Token(element.coinA.chainId,element.coinA.address,element.coinA.decimals,element.coinA.symbol);
      const TokenB = new Token(element.coinB.chainId,element.coinB.address,element.coinB.decimals,element.coinB.symbol);
      const pair = await Fetcher.fetchPairData(TokenA, TokenB,getethProvider(TokenB));
      console.log(pair)
      userpairList.push(pair)
    }
    return  userpairList;
    
  }

async function checkPairsUserbalance(pairList,library, account){
    var list = [];
    for (let index = 0; index < pairList.length; index++) {
        const element = pairList[index];
        var data = await getbalance(element.liquidityToken,library, account);
        pairList[index].userbalance = data;
        if(data.greaterThan(0)){
            list.push(pairList[index])
        }
        
        
    }
     return list ;

}

 async function getbalance(token,library, account) {
    var library = window.ethersprovider;
    var result = await useTokenbalance(library, account, token);
    console.log(result);


    return result;
  }

export async function getTokenbalance(token,library, account){
    return getbalance(token,library, account)

}

export default async function readPoolList(chainID,library, account) {
    var List = tokenList(chainID);
    var pairList = [];

    List.forEach((coinA) => {
        List.forEach((coinB) => {
            if (coinA.symbol != coinB.symbol && coinA.address != coinB.address) {
                pairList = addTOPairList(coinA, coinB, pairList);
            }
        });
    });

    var userpairList = await getPairs(pairList);

    var data = await checkPairsUserbalance(userpairList,library, account)

    return  data;

}

