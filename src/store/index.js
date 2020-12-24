import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

export default new vuex.Store({
  state: {
    ethAddress: '',
    chainID: '',
    lambdaAddress: '',
    lambBalance: 0,
    tlambBalance: 0,
    ethChainID: '',
    contract: '',
    OpenethWallet:false,
    OpenlambWallet:false
  },
  mutations: {
    changeEthAddress(state, address) {
      state.ethAddress = address;
    },
    changeID(state, id) {
      state.chainID = id;
    },
    changeLambdaAddress(state, address) {
      state.lambdaAddress = address;
    },

    changeLambBalance(state, balance) {
      state.lambBalance = balance;
    },
    changeTlambBalance(state, balance) {
      state.tlambBalance = balance;
    },
    changeEthChainID(state, id) {
      state.ethChainID = id;
    },
    changeContract(state, contract) {
      state.contract = contract;
    },
    changeOpenethWallet(state, isopen) {
      state.OpenethWallet = isopen;
    },
    changeOpenLamballet(state, isopen) {
      state.OpenlambWallet = isopen;
    }

    
  },
});
