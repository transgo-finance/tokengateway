export default {
  // 侧边栏
  aside: {
    menu: {
      m1: "Wrapper",
      m2: "Swap",
      m3: "Liquidity Pool",
      m4: "Wrapper History",
      m5: "Help Center",
      m6: "Twitter",
    },
  },
  // 跨链迁移
  home: {
    toEth: {
      t: "From Lambda Mainnet To Ethereum",
      c1: "*Lambda mainnet asset mLAMB will be wrapped to tLAMB",
      c2: "mLAMB balance：",
      c3: "Please enter the amount of mLAMB",
      c4: "You will get tLAMB：",
      c5: "Transaction Fee：",
      c6: "Lambda Fee：",
      c7: "Your ethereum wallet address below will be received tLAMB",
      c8: "Lambda mainnet asset mLAMB will be wrapped to Ethereum asset tLAMB",
    },
    toLamb: {
      t: "From Ethereum To Lambda Mainnet",
      c1: "*Ethereum asset tLAMB will be wrapped to Lambda mainnet asset",
      c2: "tLAMB balance:",
      c3: "Please enter the amount of tLAMB",
      c4: "You will get mLAMB：",
      c5: "Lambda Fee：",
      c6: "ETH Fee：",
      c7: "Your Lambda wallet address below will receive mLAMB",
      c8: "Ethereum asset tLAMB will be wrapped to Lambda mainnet asset",
    },
    question: {
      q1: "What is Wrapper",
      q2:
        "Wrapper is the process of migrating a public chain asset to Ethereum based on Transgo protocol, support the bilateral migration between Lambda main-net asset mLAMB and Ethereum asset tLAMB",
      q3: "What assets are supported by Wrapper function?",
      q4:
        "Wrapper currently only support Lambda mainnet asset mLAMB. Through Transgo protocol, Lambda Main-net asset mLAMB can be migrated to tLAMB",
      q5: "What is tLAMB",
      q6:
        "tLAMB is liquidity token for the migration of Lambda mainnet token to Ethereum on Transgo platform. tLAMB can implement decentralized transaction with other Ethereum asset  on Transgo platform.",
      q7: "What is mLAMB？",
      q8:
        "The token mLAMB supported by the Wrapper is the Lambda mainnet asset, and the liquidity token of the Lambda main-net asset mLAMB in Ethereum is tLAMB.",
    },
  },
  // 迁移记录
  record: {
    table: {
      t1: "Operating Time",
      t2: "Mainnet Hash",
      t3: "Ethereum Hash",
      t4: "State",
      t5: "Received Amount",
    },
    s1: "Transition Confirming",
    s2: "Transition Sending",
    s3: "Pending Confirmation",
    s4: "Transition Confirming",
    s5: "Transaction Succeed",
    s6: "Confirmation failed",
    s7: "Invalid Memo",
    s8: "Internal Error",
    s9: "Confirmation failed",
    s10: "Incorrect value",
    s11: "Incorrect value",
  },
  // 所有按钮的文案
  btn: {
    b1: "Connect Lambda Wallet",
    b2: "Connect ETH Wallet",
    b3: "Migrate to Ethereum",
    b4: "Migrate to Lambda Main-net",
    b5: "Transaction Sending...",
    b6: "Transaction fee counting...",
    b7: "Confirm",
    b8: "Cancel",
    b9: "Confirm",
  },
  // 所有弹窗
  dialog: {
    title: {
      t1: "Connect to wallet",
    },
    notice: {
      n1: "",
    },
    content: {
      c1: "MetaMask wallet",
      c2: "Haven't installed MetaMask wallet yet？",
      c3: "Click here",
      c4: "Install it on Chrome Store",
      c5: "After installation, refresh the page",
      c6: "LAMB Wallet",
      c7: "Haven't installed Lambda wallet yet？",
    },
  },
  // 所有通知
  notice: {
    n: "Notice",
    n1: "Please check if MetaMask wallet plugin is connected",
    n2: "Failed to get eth chainID",
    n3: "Please check if Lambda account created",
    n4: "Please check if Lambda Wallet is connected",
    n5: "Please check if Lambda Wallet plugin is installed",
    n6: "Failed to initialize Lambda Wallet",
    n7: "Please create an Eth account first",
    n8: "Failed to get ETH address",
    n9: "Account is not connected",
    n10: "You have switched the network, please wait to refresh the data",
    n11: "Please check if the MetaMask Wallet plugin is installed",
    n12: "Failed to initialize Ethereum Wallet MetaMask",
    n13: "Failed to get mLAMB balance",
    n14: "Failed to get tLAMB balance",
    n15: "The amount of mLAMB cannot be empty",
    n16: "Please make sure the swap amount is greater than the handling fee",
    n17: "Please fill in the correct amount of mLAMB",
    n18: "The input amount cannot be greater than current mLAMB balance",
    n19: "Successfully sent transaction",
    n20:
      "You can check the latest status of this transaction in Wrapper History in the left menu bar",
    n21: "The amount of tLAMB cannot be empty",
    n22: "Please fill in correct amount of tLAMB",
    n22: "The input amount cannot be greater than current tLAMB balance",
    n23: "Failed to send transaction when migrating to mainnet",
    n24: "Please check if the balance is enough",
    n25: "Less than the minimum number of migrations",
    n26: "Please check if both networks are the same",
  },
};
