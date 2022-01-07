<template>
    <div class="d-flex flex-column flex-md-row justify-md-space-around">
        <BasicStat title="market cap" :stat-value="marketCap" currency="$" />
        <BasicStat title="price usd" :stat-value="marketPrice" currency="$" />
        <BasicStat title="liquidity" :stat-value="liquidity" currency="$" />
        <BasicStat
            title="total distributed rewards"
            :stat-value="totalDistributedRewards"
            stat-unit="time"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { getContract } from '@/helpers/get-contract';
import { Contracts } from '@/constants/contracts';
import { getTokenPrice } from '@/helpers/token-price';
import { PairTokens } from '@/constants/blockchain';
@Component
export default class MarketStatGroup extends Vue {
    totalDistributedRewards: string = '';
    marketPrice: string = '';
    marketCap: string = '';
    liquidity: string = '';

    async getTotalDistributedRewards() {
        try {
            const total = await getContract(Contracts.DISTRIBUTOR)
                .methods.totalDistributed()
                .call();

            return String(total / 1e9);
        } catch (error) {
            return '';
        }
    }

    async getMarketData() {
        try {
            const reserves = await getContract(Contracts.POOL)
                .methods.getReserves()
                .call();
            const pairPrice = reserves[1] / reserves[0];
            const wavaxPrice = await getTokenPrice(PairTokens.WAVAX);

            const marketPrice = (pairPrice / 1e9) * wavaxPrice;

            return {
                wavaxReserve: reserves[1],
                snowReserve: reserves[0],
                wavaxPrice,
                marketPrice,
            };
        } catch (error) {
            return null;
        }
    }

    async getSnowTotalSupply(): Promise<number> {
        try {
            const totalSupply = await getContract(Contracts.SNOWMAN)
                .methods.totalSupply()
                .call();
            return totalSupply / 1e9;
        } catch (error) {
            return 0;
        }
    }

    async getMarketCap(marketPrice: number): Promise<string> {
        const totalSupply = await this.getSnowTotalSupply();
        return String(totalSupply * marketPrice);
    }

    async mounted() {
        this.totalDistributedRewards = await this.getTotalDistributedRewards();
        const marketData = await this.getMarketData();
        if (marketData) {
            this.marketPrice = String(marketData.marketPrice);
            this.marketCap = await this.getMarketCap(Number(this.marketPrice));
            this.liquidity = String(
                (marketData.snowReserve / 1e9) * marketData.marketPrice +
                    (marketData.wavaxReserve / 1e18) * marketData.wavaxPrice
            );
        }
    }
}
</script>

<style lang="scss" scoped></style>
