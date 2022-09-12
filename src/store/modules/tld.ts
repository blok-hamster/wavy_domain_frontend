import { ethers } from "ethers";
import tldAbi from "../../abi/PunkTLD.json";
import MinterAbi from "../../abi/Minter.json";
import useChainHelpers from "../../hooks/useChainHelpers";

const { getFallbackProvider } = useChainHelpers();

export default {
  namespaced: true,

  state: () => ({
    discountPercentage: 0,
    tldName: ".getwavy",
    tldAddress: "0x6Ce04229705F62121A14d97662D25FA23551b6Ad", // TODO
    tldContract: null,
    tldChainId: 80001,
    tldChainName: "Polygon Testnet",
    minterAddress: "0x3dE27f628Bee281413f2B02FD28Db8Fc458F9172", // TODO
    minterContract: null,
    minterPaused: false,
    minterTldPrice: 0,
  }),

  getters: {
    getMinterDiscountPercentage(state) {
      return state.discountPercentage;
    },
    getTldAddress(state) {
      return state.tldAddress;
    },
    getTldContract(state) {
      return state.tldContract;
    },
    getTldChainId(state) {
      return state.tldChainId;
    },
    getTldChainName(state) {
      return state.tldChainName;
    },
    getTldName(state) {
      return state.tldName;
    },
    getMinterAddress(state) {
      return state.minterAddress;
    },
    getMinterContract(state) {
      return state.minterContract;
    },
    getMinterPaused(state) {
      return state.minterPaused;
    },
    getMinterTldPrice(state) {
      return state.minterTldPrice;
    },
  },

  mutations: {
    setTldContract(state) {
      let fProvider = getFallbackProvider(state.tldChainId);

      const tldIntfc = new ethers.utils.Interface(tldAbi);
      state.tldContract = new ethers.Contract(
        state.tldAddress,
        tldIntfc,
        fProvider
      );
    },

    setMinterContract(state, contract) {
      state.minterContract = contract;
    },

    setDiscountPercentage(state, percentage) {
      state.discountPercentage = percentage;
    },

    setMinterPaused(state, paused) {
      state.minterPaused = paused;
    },

    setMinterTldPrice(state, price) {
      state.minterTldPrice = price;
    },
  },

  actions: {
    async fetchMinterContractData({ commit, state }) {
      let fProvider = getFallbackProvider(state.tldChainId);

      // minter contract
      const minterIntfc = new ethers.utils.Interface(MinterAbi);
      const minterContract = new ethers.Contract(
        state.minterAddress,
        minterIntfc,
        fProvider
      );

      // check if TLD contract is paused
      const paused = await minterContract.paused();
      commit("setMinterPaused", paused);

      // get price for 1 char
      const priceWei = await minterContract.price();
      const domainPrice = ethers.utils.formatEther(priceWei);
      commit("setMinterTldPrice", domainPrice);
    },
  },
};
