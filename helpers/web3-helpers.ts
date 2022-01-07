import { networkProviderParams, AVAX_CHAIN_ID } from '@/constants/blockchain';
const Web3 = require('web3');

const switchRequest = () => {
    return (<any>window).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkProviderParams.chainId }],
    });
};

const addChainRequest = () => {
    return (<any>window).ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkProviderParams],
    });
};

export const switchToAvalancheNetworkNetwork = async (): Promise<boolean> => {
    if ((<any>window).ethereum) {
        try {
            await switchRequest();
            return true;
        } catch (error: any) {
            console.log('Error switching network: ', error);
            if (error.code === 4902) {
                try {
                    await addChainRequest();
                    await switchRequest();
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

export const setupNetworkListeners = (
    handleChainChanged: Function,
    handleAccountsChanged: Function
) => {
    const ethereum = (<any>window).ethereum;
    if (ethereum) {
        console.log('Eth: ', ethereum);
        ethereum.on('chainChanged', handleChainChanged);
        ethereum
            .on(
                'accountsChanged',
                handleAccountsChanged
            )(<any>window)
            .addEventListener('unload', () => {
                ethereum.removeListener(
                    'accountsChanged',
                    handleAccountsChanged
                );

                ethereum.removeListener('chainChanged', handleChainChanged);
            });
    }
};

export const connectToWallet = async (
    showAlertIfError = true
): Promise<{ address: string; chainId: number } | null> => {
    const ethereum = (<any>window).ethereum;
    if (ethereum) {
        (<any>window).web3 = new Web3(ethereum);
        try {
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });

            const chainId = await (<any>window).web3.eth.getChainId();

            return {
                address: accounts[0],
                chainId,
            };
        } catch (error: any) {
            if (error.code === 4001) {
                // User rejected request
                return null;
            }
        }
    }

    if (showAlertIfError) {
        alert(
            'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
        );
    }

    return null;
};

export const checkWrongPaymentNetwork = async (
    chainId: number
): Promise<boolean> => {
    if (chainId !== AVAX_CHAIN_ID) {
        const result = await switchToAvalancheNetworkNetwork();
        return !result;
    }

    return false;
};
