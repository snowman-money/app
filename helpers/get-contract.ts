import { Contracts } from '@/constants/contracts';
import { addresses } from '@/constants/addresses';
import { SnowmanContract, DistributorContract, PoolContract } from '@/abi';
const Web3 = require('web3');

export const getContract = (contract: Contracts) => {
    const connectedProvider = (<any>window).web3Provider;
    if (!connectedProvider) {
        return null;
    }

    switch (contract) {
        case Contracts.SNOWMAN:
            return new connectedProvider.eth.Contract(
                SnowmanContract,
                addresses[Contracts.SNOWMAN]
            );
        case Contracts.DISTRIBUTOR:
            return new connectedProvider.eth.Contract(
                DistributorContract,
                addresses[Contracts.DISTRIBUTOR]
            );
        case Contracts.POOL:
            return new connectedProvider.eth.Contract(
                PoolContract,
                addresses[Contracts.POOL]
            );
        default:
            return null;
    }
};
