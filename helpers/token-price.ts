import axios from 'axios';
import { PairTokens } from '@/constants/blockchain';

const cache: { [key in PairTokens]: number } = {
    WAVAX: 0,
};

export const loadTokenPrices = async () => {
    const url =
        'https://api.coingecko.com/api/v3/simple/price?ids=wrapped-avax&vs_currencies=usd';
    const { data } = await axios.get(url);

    cache.WAVAX = data['wrapped-avax'].usd;
};

export const getTokenPrice = (symbol: PairTokens): number => {
    return Number(cache[symbol]);
};
