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
  // const  account = ''; //账户地址
  // const  library = ''  //web3 提供对象

  const token =
    amountToApprove instanceof TokenAmount ? amountToApprove.token : undefined;
  const currentAllowance = await useTokenAllowance(
    library,
    account,
    token,
    account ?? undefined,
    spender
  );
  // const pendingApproval = useHasPendingApproval(token.address, spender)

  // check the current approval status
  // const approvalState: ApprovalState = useMemo(() => {
  //   if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
  //   if (amountToApprove.currency === ETHER) return ApprovalState.APPROVED
  //   // we might not have enough data to know whether or not we need to approve
  //   if (!currentAllowance) return ApprovalState.UNKNOWN

  //   // amountToApprove will be defined if currentAllowance is
  //   return currentAllowance.lessThan(amountToApprove)
  //     ? pendingApproval
  //       ? ApprovalState.PENDING
  //       : ApprovalState.NOT_APPROVED
  //     : ApprovalState.APPROVED
  // }, [amountToApprove, currentAllowance, pendingApproval, spender])
  console.log("*****************");

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

    return  new Promise((resolve, reject)=>{

      
      tokenContract
    .approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
      gasLimit: calculateGasMargin(estimatedGas)
    })
    .then(response => {
      console.log({
        summary: "Approve " + amountToApprove.currency.symbol,
        approval: { tokenAddress: token.address, spender: spender }
      });
      resolve({
        summary: "Approve " + amountToApprove.currency.symbol,
        approval: { tokenAddress: token.address, spender: spender },
        hash:response.hash, 
        response:response
      })

      //   addTransaction(response, {
      //     summary: 'Approve ' + amountToApprove.currency.symbol,
      //     approval: { tokenAddress: token.address, spender: spender }
      //   })
    })
    .catch(error => {
      console.debug("Failed to approve token", error);
      reject(error)
      // throw error;
    });

    })
   
}

export function useApproveCallbackFromTrade(
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
