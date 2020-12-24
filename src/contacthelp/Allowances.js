import { Token, TokenAmount } from "@uniswap/sdk";

import { useTokenContract } from "./useContract.js";

export async function useTokenAllowance(
  library,
  account,
  token,
  owner,
  spender
) {
  const contract = useTokenContract(library, account, token.address, false);

  console.log(contract);
  var allowance;
  try {
    allowance = await contract.allowance(owner, spender);
  } catch (error) {
    console.log(error);
  }

  
  return new TokenAmount(token, allowance.toString());
}

export async function useTokentotalSupply(
  library,
  account,
  token,
  owner,
  spender
) {
  const contract = useTokenContract(library, account, token.address, false);

  console.log(contract);
  var result;
  try {
    result = await contract.totalSupply();
  } catch (error) {
    console.log(error);
  }

  
  return new TokenAmount(token, result.toString());
}


export async function useTokenbalance(
  library,
  account,
  token
) {
  const contract = useTokenContract(library, account, token.address, false);

  console.log(contract);
  var result;
  try {
    result = await contract.balanceOf(account);
  } catch (error) {
    console.log(error);
  }

  console.log(result)
  return new TokenAmount(token, result.toString());
}