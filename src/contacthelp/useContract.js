import { Contract } from "@ethersproject/contracts";
// import { abi as GOVERNANCE_ABI } from '@uniswap/governance/build/GovernorAlpha.json'
// import { abi as UNI_ABI } from '@uniswap/governance/build/Uni.json'
// import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
// import { abi as MERKLE_DISTRIBUTOR_ABI } from '@uniswap/merkle-distributor/build/MerkleDistributor.json'
import { ChainId, WETH } from "@uniswap/sdk";
// import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
// import { useMemo } from 'react'
// import { GOVERNANCE_ADDRESS, MERKLE_DISTRIBUTOR_ADDRESS, UNI } from '../constants'
// import {
//   ARGENT_WALLET_DETECTOR_ABI,
//   ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS
// } from '../constants/abis/argent-wallet-detector'
// import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
// import ENS_ABI from '../constants/abis/ens-registrar.json'
// import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'

import ERC20_ABI from "../constants/abis/erc20.json";
import ERC20_ABI_LAMB from "../constants/abis/erc20lamb.json";

// import { MIGRATOR_ABI, MIGRATOR_ADDRESS } from '../constants/abis/migrator'
// import UNISOCKS_ABI from '../constants/abis/unisocks.json'
// import WETH_ABI from '../constants/abis/weth.json'
// import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
// import { V1_EXCHANGE_ABI, V1_FACTORY_ABI, V1_FACTORY_ADDRESSES } from '../constants/v1'
import { getContract } from "./utils.js";
// import { useActiveWeb3React } from './index'

import { abi as IUniswapV2PairABI } from "@uniswap/v2-core/build/IUniswapV2Pair.json";

// returns null on errors
function useContract(
  library,
  account,
  address,
  ABI,
  withSignerIfPossible = true
) {
  if (!address || !ABI || !library) return null;
  try {
    // return new web3.eth.Contract(ABI,address)
    return getContract(
      address,
      ABI,
      library,
      withSignerIfPossible && account ? account : undefined
    );
  } catch (error) {
    console.error("Failed to get contract", error);
    return null;
  }
}

export function useTokenContract(
  library,
  account,
  tokenAddress,
  withSignerIfPossible
) {
  console.info("- -useTokenContract");
  return useContract(
    library,
    account,
    tokenAddress,
    ERC20_ABI,
    withSignerIfPossible
  );
}

export function uselambdaTokenContract(
  library,
  account,
  tokenAddress,
  withSignerIfPossible
) {
  console.info("- -useTokenContract");
  return useContract(
    library,
    account,
    tokenAddress,
    ERC20_ABI_LAMB,
    withSignerIfPossible
  );
}

export function usePairContract(
  library,
  account,
  tokenAddress,
  withSignerIfPossible
) {
  console.info("- -useTokenContract");
  return useContract(
    library,
    account,
    tokenAddress,
    IUniswapV2PairABI,
    withSignerIfPossible
  );
}
