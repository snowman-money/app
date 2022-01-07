<template>
    <div class="d-flex align-center">
        <v-btn
            v-if="!walletAddress"
            tile
            class="black--text"
            color="primary"
            elevation="2"
            large
            @click.stop="connectButtonClicked"
            >Connect Wallet</v-btn
        >
        <div v-else class="d-flex align-center">
            <img
                class="mr-3"
                :src="require('~/assets/icons/connected-icon.svg')"
            />
            <span id="wallet-address" class="mr-4">{{ truncatedAddress }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class ConnectWallet extends Vue {
    get truncatedAddress() {
        return `${this.walletAddress.substr(
            0,
            6
        )}...${this.walletAddress.substr(this.walletAddress.length - 6, 6)}`;
    }

    get walletAddress() {
        return this.$store.state.wallet.address;
    }

    async connectButtonClicked() {
        const result = await this.$web3.connectToWallet(true);
        console.log('Result: ', result);
        if (!result) {
            return;
        }

        await this.$web3.checkWrongPaymentNetwork();
    }
}
</script>

<style lang="scss" scoped></style>
