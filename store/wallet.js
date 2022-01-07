export const state = () => ({
    address: null,
    providerChainId: null,
});

export const mutations = {
    setAddress(state, address) {
        state.address = address;
    },
    setProviderChainId(state, chainId) {
        state.providerChainId = chainId;
    },
};
