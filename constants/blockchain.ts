interface AddEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
}

export const AVAX_CHAIN_ID = 43114;

export const networkProviderParams: AddEthereumChainParameter = {
    chainId: '0xa86a', // A 0x-prefixed hexadecimal string
    chainName: 'Avalanche Network',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX', // 2-6 characters long
        decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io/'],
};

export enum PairTokens {
    WAVAX = 'WAVAX',
}

export enum SupportedTokens {
    SNOWMAN = 'snowman',
    TIME = 'time',
}

interface TokenParam {
    type: string;
    options: {
        address: string;
        symbol: string;
        decimals: number;
        image: string;
    };
}

export const tokenParams: { [key in SupportedTokens]: TokenParam } = {
    snowman: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
            address: '0x6A6fae2d14a872D2b040F880d0ECdaE11c6c3033', // The address that the token is at.
            symbol: 'SnowMan', // A ticker symbol or shorthand, up to 5 chars.
            decimals: 9, // The number of decimals in the token
            image: 'https://snowman.money/wp-content/uploads/2021/12/cropped-attachment_131795811.png', // A string url of the token logo
        },
    },
    time: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
            address: '0xb54f16fb19478766a268f172c9480f8da1a7c9c3', // The address that the token is at.
            symbol: 'TIME', // A ticker symbol or shorthand, up to 5 chars.
            decimals: 9, // The number of decimals in the token
            image: 'https://snowtrace.io/token/images/wonderland-time_32.png', // A string url of the token logo
        },
    },
};
