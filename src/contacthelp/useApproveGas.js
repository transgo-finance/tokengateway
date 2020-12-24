import { MaxUint256 } from "@ethersproject/constants";
import { TransactionResponse } from "@ethersproject/providers";
import {
  Trade,
  TokenAmount,
  CurrencyAmount,
  ETHER,
  Percent
} from "@uniswap/sdk";
import JSBI from "jsbi/dist/jsbi.mjs";

import { useTokenAllowance } from "./Allowances";

// import { Field } from '../state/swap/actions'

import { calculateGasMargin } from "./utils";
import { useTokenContract } from "./useContract";

import { ROUTER_ADDRESS}  from '@/constants/index.js'

export const Field = {
  INPUT: "INPUT",
  OUTPUT: "OUTPUT"
};

// computes the minimum amount out and maximum amount in for a trade given a user specified allowed slippage in bips



// converts a basis points value to a sdk percent
export function basisPointsToPercent(num) {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000));
}

export function computeSlippageAdjustedAmounts(trade, allowedSlippager) {
  const pct = basisPointsToPercent(allowedSlippager);
  return {
    [Field.INPUT]: trade.maximumAmountIn(pct),
    [Field.OUTPUT]: trade.minimumAmountOut(pct)
  };
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export async function useApproveCallback(
  account,
  library,
  amountToApprove,
  spender
) {

  console.log("*****************");
  const token =
  amountToApprove instanceof TokenAmount ? amountToApprove.token : undefined;
  
  const tokenContract = useTokenContract(library, account, token.address);

  if (!token) {
    console.error("no token");
    return;
  }

  if (!tokenContract) {
    console.error("tokenContract is null");
    return;
  }

  if (!amountToApprove) {
    console.error("missing amount to approve");
    return;
  }

  if (!spender) {
    console.error("no spender");
    return;
  }

  let useExact = false;
  const estimatedGas = await tokenContract.estimateGas
    .approve(spender, MaxUint256)
    .catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true;
      return tokenContract.estimateGas.approve(
        spender,
        amountToApprove.raw.toString()
      );
    });
  console.log('estimatedGas',estimatedGas)
  return estimatedGas

    
   
}

export function useApproveCallbackFromTradegas(
  account,
  library,
  trade,
  allowedSlippage
) {
  console.log('useApproveCallbackFromTrade')
  if (trade == undefined) {
    return;
  }
  const amountToApprove = computeSlippageAdjustedAmounts(
    trade,
    allowedSlippage
  )[Field.INPUT];

  return useApproveCallback(account, library, amountToApprove, ROUTER_ADDRESS);
}
