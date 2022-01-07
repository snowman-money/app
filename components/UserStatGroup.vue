<template>
    <v-row class="my-12" justify="space-around" align="center">
        <UserStat
            title="balance"
            :stat-value="snowmanBalance"
            stat-unit="snowman"
            :icon="require('~/assets/icons/snowman-icon.png')"
        />
        <UserStat
            title="claimed rewards"
            :stat-value="claimedRewards"
            stat-unit="time"
            :icon="require('~/assets/icons/time-icon.svg')"
        />
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { getContract } from '@/helpers/get-contract';
import { Contracts } from '@/constants/contracts';

@Component
export default class UserStatGroup extends Vue {
    snowmanBalance: string = '';
    claimedRewards: string = '';

    async getSnowmanBalance() {
        const isConnected = await this.$web3.isConnected();
        if (!isConnected) {
            return '';
        }
        const connectedAddress = this.$store.state.wallet.address;

        try {
            const balance = await getContract(Contracts.SNOWMAN)
                .methods.balanceOf(connectedAddress)
                .call();

            return String(balance / 1e9);
        } catch (err) {
            return '';
        }
    }

    async getClaimedRewards() {
        const isConnected = await this.$web3.isConnected();
        if (!isConnected) {
            return '';
        }

        const connectedAddress = this.$store.state.wallet.address;
        try {
            const claimedRewards = await getContract(Contracts.DISTRIBUTOR)
                .methods.shares(connectedAddress)
                .call();
            return String(claimedRewards.totalRealised / 1e9);
        } catch (error) {
            return '';
        }
    }

    async mounted() {
        this.snowmanBalance = await this.getSnowmanBalance();
        this.claimedRewards = await this.getClaimedRewards();
    }
}
</script>

<style lang="scss" scoped></style>
