<template>
    <div>
        <v-row class="mb-3" justify="space-around" align="center">
            <BasicStat
                title="pending rewards"
                :stat-value="pendingRewards"
                stat-unit="time"
                font-scale="1.3"
            />
        </v-row>
        <v-row class="mt-3" justify="space-around" align="center">
            <v-btn
                id="claim-btn"
                tile
                class="black--text"
                color="primary"
                elevation="2"
                large
                :loading="isLoading"
                :disabled="!canClaim"
                @click.stop="claimButtonClicked"
                >Claim Rewards</v-btn
            >
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { getContract } from '@/helpers/get-contract';
import { Contracts } from '@/constants/contracts';

@Component
export default class ClaimRewards extends Vue {
    pendingRewards: string = '';
    isLoading: boolean = false;
    async claimButtonClicked() {
        const isConnected = await this.$web3.isConnected();
        if (!isConnected) {
            return;
        }
        const connectedAddress = this.$store.state.wallet.address;
        this.isLoading = true;
        try {
            await getContract(Contracts.DISTRIBUTOR)
                .methods.claimDividend()
                .send({ from: connectedAddress });
            this.pendingRewards = await this.getPendingRewards();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            return null;
        }
    }

    async getPendingRewards() {
        const isConnected = await this.$web3.isConnected();
        if (!isConnected) {
            return '';
        }
        const connectedAddress = this.$store.state.wallet.address;

        try {
            const pendingRewards = await getContract(Contracts.DISTRIBUTOR)
                .methods.getUnpaidEarnings(connectedAddress)
                .call();

            return String(pendingRewards / 1e9);
        } catch (error) {
            return '';
        }
    }

    get canClaim() {
        return this.pendingRewards !== '' && Number(this.pendingRewards) > 0;
    }

    async mounted() {
        this.pendingRewards = await this.getPendingRewards();
    }
}
</script>

<style lang="scss" scoped>
#claim-btn {
    &.v-btn--disabled {
        background-color: rgba(87, 224, 250, 0.49) !important;
    }
}
</style>
