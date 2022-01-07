import { Plugin } from '@nuxt/types';
import {
    networkProviderParams,
    AVAX_CHAIN_ID,
    SupportedTokens,
    tokenParams,
} from '@/constants/blockchain';
import { loadTokenPrices } from '@/helpers/token-price';
const Web3 = require('web3');

interface SnowmanWeb3Props {
    switchToAvalancheNetworkNetwork(): Promise<boolean>;
    isConnected(): Promise<boolean>;
    connectToWallet(showAlertIfError: boolean): Promise<boolean>;
    checkWrongPaymentNetwork(): Promise<boolean>;
    addToken(token: SupportedTokens): Promise<boolean>;
}

declare module 'vue/types/vue' {
    interface Vue {
        $web3: SnowmanWeb3Props;
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $web3: SnowmanWeb3Props;
    }
    interface Context {
        $web3: SnowmanWeb3Props;
    }
}

class SnowmanWeb3 implements SnowmanWeb3Props {
    _store: any;
    constructor(store: any) {
        this._store = store;
    }

    async addToken(token: SupportedTokens): Promise<boolean> {
        const ethereum = (<any>window).ethereum;
        if (ethereum) {
            const params = tokenParams[token];
            const wasAdded = await ethereum.request({
                method: 'wallet_watchAsset',
                params,
            });

            return wasAdded;
        }

        return false;
    }

    switchRequest = () => {
        return (<any>window).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networkProviderParams.chainId }],
        });
    };

    addChainRequest = () => {
        return (<any>window).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networkProviderParams],
        });
    };

    switchToAvalancheNetworkNetwork = async (): Promise<boolean> => {
        if ((<any>window).ethereum) {
            try {
                await this.switchRequest();
                return true;
            } catch (error: any) {
                console.log('Error switching network: ', error);
                if (error.code === 4902) {
                    try {
                        await this.addChainRequest();
                        await this.switchRequest();
                        return true;
                    } catch (addError) {
                        console.log(addError);
                    }
                    console.log(error);
                }
            }
        } else {
            // if no window.ethereum then MetaMask is not installed
            alert(
                'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
            );
        }

        return false;
    };

    subscribeListeners() {
        const handleChainChanged = (chainIdHex: string) => {
            const chainId = parseInt(chainIdHex, 16);

            this._store.commit('wallet/setProviderChainId', chainId);
        };

        const handleAccountsChanged = (accounts: Array<string>) => {
            if (accounts.length > 0) {
                this._store.commit('wallet/setAddress', accounts[0]);
            }
        };
        (<any>window).ethereum.on('chainChanged', handleChainChanged);

        (<any>window).ethereum.on('accountsChanged', handleAccountsChanged);

        (<any>window).addEventListener('unload', () => {
            (<any>window).ethereum.removeListener(
                'accountsChanged',
                handleAccountsChanged
            );
            (<any>window).ethereum.removeListener(
                'chainChanged',
                handleChainChanged
            );
        });
    }

    async isConnected() {
        if (!(<any>window).web3Provider) {
            return false;
        }
        const chainId = await (<any>window).web3Provider.eth.getChainId();
        return chainId === AVAX_CHAIN_ID;
    }

    async connectToWallet(showAlertIfError = true): Promise<boolean> {
        const ethereum = (<any>window).ethereum;
        if (ethereum) {
            const connectedProvider = new Web3(ethereum);
            this.subscribeListeners();
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                });

                const chainId = await connectedProvider.eth.getChainId();

                this._store.commit('wallet/setAddress', accounts[0]);
                this._store.commit('wallet/setProviderChainId', chainId);

                (<any>window).web3Provider = connectedProvider;

                await this.checkWrongPaymentNetwork();
            } catch (error: any) {
                if (error.code === 4001) {
                    // User rejected request
                    return false;
                }
            }

            return true;
        }

        // if no window.ethereum then MetaMask is not installed
        if (showAlertIfError) {
            alert(
                'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
            );
        }
        return false;
    }

    async checkWrongPaymentNetwork(): Promise<boolean> {
        if (this._store.state.wallet.providerChainId !== AVAX_CHAIN_ID) {
            const result = await this.switchToAvalancheNetworkNetwork();
            return !result;
        }

        return false;
    }
}

const web3Plugin: Plugin = async (_context, inject) => {
    const web3 = new SnowmanWeb3(_context.store);
    await web3.connectToWallet(false);
    await loadTokenPrices();

    inject('web3', web3);
};

export default web3Plugin;
