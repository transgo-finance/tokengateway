export default {
  swap: {
    pageTitle: "Swap",
    fromToken: "From",
    toToken: "To（estimated）",
    balance: "Balance",
    swapBtn: "Swap",
    price: "Price",
    PriceImpact: "Price Impact",
    LiquidityProviderFee: "Liquidity Provider Fee",
    Minimumreceived: "Minimum Received",
    LinkWallet: "Connect Wallet",
    PriceImpactError: "The price fluctuates too much to trade",
    approve: "Approve",
    ethgasfree: "ETH Gas Fee",
    enterthequantity: "Please enter the quantity",
    pleasechoose: "Please Select",
    actions: {
      checkMetaMask: "Please check if MetaMask Wallet is installed",
      Amountexceedsbalance: "The swap amount cannot be greater than balance",
      choosedifferentassettransaction:
        "Enter the amount and select different assets to swap",
      Transactionfailure: "Transaction Failed",
      approvesuccessful: "Authorization succeeded",
      Transactionsent: "Transaction Sent",
      Successfultrade:'Transaction succeeded'
    },
    help: {
      PriceImpact:
        "The difference between the market price and the estimated price due to the transaction scale",
      LiquidityProviderFee:
        "A portion of each transaction (0.30%) will be provided as an incentive rewards to the liquidity provider.",
      Minimumreceived:
        "If there is a large adverse price change before confirmation, your transaction will resume",
      ethgasfree: "ETH Gas Fee",
    },
    helpTxt: {
      title1: "What is Swap？",
      titlep: `Swap transaction module is an automatic liquidity protocol based on Uniswap, which supports users to conduct Token exchange transaction, so that more Transgo platform functions can be used later`,
      title2: "What is tLAMB？",
      titlep2: `tLAMB is liquidity token for the migration of Lambda mainnet token to Ethereum on Transgo platform. tLAMB can implement decentralized transaction with other Ethereum asset  on Transgo platform.The value of t assets only represents the value of the original mainnet assets, and does not represent the value of any other assets with the same name or similar names in Ethereum`,
      title3: "What is LAMB",
      titlep3: `LAMB is the native token (ERC 20) of the Lambda project. LAMB will support users to implement decentralized transactions with other Ethereum assets on the Transgo platform, and support users to use the transaction and liquidity pool functions of the Transgo platform.`,
    },
  },
  lambdalink: {
    contract: "View tLAMB Protocol",
  },
  swapinput:{
      beanumber:'It has to be a number'
  }
};
