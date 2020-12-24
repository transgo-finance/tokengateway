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
import { uselambdaTokenContract as useTokenContract } from "./useContract";

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
    [Field.INPUT]: trade.maximumAmountIn(pct)
    // [Field.OUTPUT]: trade.minimumAmountOut(pct)
  };
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export async function useApproveCallbacklamb(
  account,
  library,
  amountToApprove,
  spender
) {


  const token =
    amountToApprove instanceof TokenAmount ? amountToApprove.token : undefined;
  // const currentAllowance = await useTokenAllowance(
  //   library,
  //   account,
  //   token,
  //   account ?? undefined,
  //   spender
  // );
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
  console.log("*****************llamb");

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

  var allowancenum = await tokenContract.allowance(account, spender);
  const estimatedGas = await tokenContract.estimateGas
    .approve(spender, allowancenum.toString(), useExact ? amountToApprove.raw.toString() : MaxUint256)
    .catch(e => {
      // general fallback for tokens who restrict approval amounts
      console.log(e);
      useExact = true;
      return tokenContract.estimateGas.approve(
        spender,
        allowancenum.toString(),
        amountToApprove.raw.toString()
      );
    });
  
    return estimatedGas;
  




   
}

export function useApproveCallbackFromTradeGas(
  account,
  library,
  trade,
  allowedSlippage
) {
  if (trade == undefined) {
    return;
  }
  const amountToApprove = computeSlippageAdjustedAmounts(
    trade,
    allowedSlippage
  )[Field.INPUT];

  return useApproveCallbacklamb(
    account,
    library,
    amountToApprove,
    ROUTER_ADDRESS
  );
}
