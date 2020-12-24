export default {
  // 侧边栏
  aside: {
    menu: {
      m1: "跨链迁移",
      m2: "交易",
      m3: "流动性池",
      m4: "迁移记录",
      m5: "帮助中心",
      m6: "推特",
    },
  },
  // 跨链迁移
  home: {
    toEth: {
      t: "迁移资产至以太坊",
      c1: "*注意：Lambda 主网资产 mLAMB 将迁移成 tLAMB",
      c2: "mLAMB 余额：",
      c3: "请输入 mLAMB 数量",
      c4: "将获得的 tLAMB 数量：",
      c5: "交易手续费：",
      c6: "Lambda 手续费：",
      c7: "您以下的以太坊地址将收到 tLAMB",
      c8: "Lambda 主网资产 mLAMB 将迁移成 tLAMB",
    },
    toLamb: {
      t: "迁移资产至 Lambda 主网",
      c1: "*注意：tLAMB 将迁移成 Lambda 主网资产 mLAMB",
      c2: "tLAMB 余额:",
      c3: "请输入 tLAMB 数量",
      c4: "将获得的 mLAMB 主网资产数量：",
      c5: "Lambda 手续费：",
      c6: "ETH 手续费：",
      c7: "您的以下Lambda地址将收到主网资产 mLAMB",
      c8: "tLAMB 将迁移成 Lambda 主网资产 mLAMB",
    },
    question: {
      q1: "什么是跨链资产迁移？",
      q2:
        "跨链资产迁移是指基于Transgo协议下，Lambda 主网资产 mLAMB 和 以太坊资产 tLAMB 之间的双向迁移。",
      q3: "跨链资产迁移支持哪些资产？",
      q4:
        "跨链资产迁移当前只支持Lambda 主网资产mLAMB，通过Transgo协议，Lambda 主网资产mLAMB可迁移成tLAMB",
      q5: "什么是 tLAMB？",
      q6:
        "tLAMB是Lambda主网代币在Transgo平台中迁移至以太坊的流动性通证，tLAMB可以在Transgo上实现与其他以太坊资产的去中心化交易",
      q7: "什么是mLAMB？",
      q8:
        "跨链资产迁移支持的代币mLAMB是Lambda主网资产，Lambda主网资产mLAMB在以太坊的流动性通证是tLAMB。",
    },
  },
  // 迁移记录
  record: {
    table: {
      t1: "操作时间",
      t2: "主网 Hash",
      t3: "以太坊 Hash",
      t4: "交易状态",
      t5: "实际到账金额"
    },
    s1: "交易确认中",
    s2: "待发送交易",
    s3: "待确认交易",
    s4: "待确认中",
    s5: "交易已确认",
    s6: "确认失败",
    s7: "无效Memo",
    s8: "内部错误",
    s9: "确认失败",
    s10: "数量太小",
    s11: "数量太大",
  },
  // 所有按钮的文案
  btn: {
    b1: "连接 Lambda 钱包",
    b2: "连接 ETH 钱包",
    b3: "迁移至以太坊",
    b4: "迁移至主网",
    b5: "发送交易中...",
    b6: "计算手续费中...",
    b7: "确认迁移",
    b8: "取消",
    b9: "确定",
  },
  // 所有弹窗
  dialog: {
    title: {
      t1: "连接钱包",
    },
    notice: {
      n1: "",
    },
    content: {
      c1: "MetaMask 钱包",
      c2: "还没下载 MetaMask 钱包？",
      c3: "点此本地下载",
      c4: "Chrome 商店下载",
      c5: "安装后，刷新页面即可",
      c6: "LAMB Wallet 钱包",
      c7: "还没下载 LAMB Wallet 钱包？",
    },
  },
  // 所有通知
  notice: {
    n: "注意",
    n1: "请检查是否已连接 MetaMask 钱包插件",
    n2: "获取 eth chainID 失败",
    n3: "请检查是否创建 Lambda 账户",
    n4: "请检查是否连接 Lambda 钱包",
    n5: "请检查是否已下载 Lambda 钱包插件",
    n6: "初始化 Lambda 钱包失败",
    n7: "请先创建 Eth 账户",
    n8: "获取 ETH 地址失败",
    n9: "未连接账户",
    n10: "您已切换网络,请等待刷新数据",
    n11: "请检查是否已下载 MetaMask 钱包插件",
    n12: "初始化以太坊钱包 MetaMask 失败",
    n13: "获取mLAMB余额失败",
    n14: "获取tLAMB余额失败",
    n15: "mLAMB 数量不能为空",
    n16: "请确保兑换数量大于手续费",
    n17: "请填入正确的 mLAMB 数量",
    n18: "输入数量不能大于当前mLAMB余额",
    n19: "发送交易成功",
    n20: "您可到左侧菜单栏中的 迁移记录 中查看本次交易的最新状态",
    n21: "tLAMB 数量不能为空",
    n22: "请填入正确的 tLAMB 数量",
    n22: "输入数量不能大于当前tLAMB余额",
    n23: "迁移到主网交易发送失败",
    n24: "请检查是否有足够的余额",
    n25: "小于最小迁移数量",
    n26: "请确认两边网络是否一致"
  },
};
