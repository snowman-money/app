<template>
    <div>
        <v-row
            class="d-xs-flex d-md-none flex-row px-6 pt-12 pb-3 align-center"
        >
            <v-col cols="6">
                <AddTokens />
            </v-col>
            <v-col cols="6">
                <ConnectWallet />
            </v-col>
        </v-row>
        <UserStatGroup />
        <div id="secondary-section" class="px-6 py-12">
            <MarketStatGroup />
            <ClaimRewards class="mt-5" />
        </div>
        <div id="faq-section" class="px-6 py-12">
            <h2 class="mb-4">Frequently Asked Questions</h2>
            <v-expansion-panels id="faq-list" flat>
                <v-expansion-panel class="mb-3">
                    <v-expansion-panel-header
                        >How do I set up Avalanche Network on MetaMask to get
                        SNOWMAN?</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                        <a
                            href="https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche"
                            >https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche
                        </a>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="mb-3">
                    <v-expansion-panel-header
                        >What is the Snowman Tax?</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                        Every Snowman transaction is taxed at 13% and reflected
                        to other Snowman holders. This is how you earn TIME
                        (Wonderland) rewards! <br />
                        - 13% Tax on Buy and Sells of SNOWMAN <br />
                        7% Rewards (in TIME) <br />
                        4% Continued Marketing and Development of Snowman DAO
                        <br />
                        2% for SNOWMAN liquidity
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="mb-3">
                    <v-expansion-panel-header
                        >How do I buy SNOWMAN?</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                        <ol class="mb-3">
                            <li>
                                Download the MetaMask Chrome Extension or mobile
                                app. Setup your account & make sure you’re
                                connected to the Avalanche Network.
                            </li>
                            <li>
                                Use Binance or Coinbase to purchase AVAX and
                                send it over to your MetaMask Wallet Address. If
                                you already have AVAX, simply send it to your
                                MetaMask Wallet
                            </li>
                            <li>
                                Visit
                                <a
                                    target="_blank"
                                    href="https://traderjoexyz.com/#/trade?outputCurrency=0x6A6fae2d14a872D2b040F880d0ECdaE11c6c3033"
                                    >https://traderjoexyz.com/#/trade?outputCurrency=0x6A6fae2d14a872D2b040F880d0ECdaE11c6c3033</a
                                >
                                and swap your AVAX for SNOWMAN. (if you hold
                                another token, you can swap that directly for
                                SNOWMAN as well).
                                <i>Make sure you set slippage at 20%</i>
                            </li>
                            <li>
                                Congratulations! You are now in the Snowman DAO
                                and ready to earn rewards! Now is a good time to
                                tell your friends about SNOWMAN!
                            </li>
                        </ol>
                        You can find a more detailed post on buying here:
                        <a
                            href="https://medium.com/@SnowmanDAO/how-and-where-to-buy-snowman-dao-snowman-an-easy-step-by-step-guide-817f77c73074"
                            target="_blank"
                        >
                            https://medium.com/@SnowmanDAO/how-and-where-to-buy-snowman-dao-snowman-an-easy-step-by-step-guide-817f77c73074
                        </a>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="mb-3">
                    <v-expansion-panel-header
                        >Do I just need to hold SNOWMAN to earn
                        TIME?</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                        <p>
                            Yes. AVAX transactions are cheap, so TIME rewards
                            are reflected to your wallet that holds SNOWMAN. The
                            payout is distributed on every trade (buys+sells) as
                            part of the Snowman tax (13% tax, and 7% for rewards
                            - 4% to DAO treasury and 2% for exchange liquidity).
                            The threshold on TIME distribution is 2150 gwei, so
                            if there is not enough to reflect then it is stored
                            until it passes that threshold.
                        </p>
                        <p>
                            If you feel you're missing some TIME rewards, just
                            buy or sell 1 SNOWMAN and it will trigger a
                            distribution. A “claim” feature will be added to
                            dashboard soon.
                        </p>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { setupNetworkListeners } from '../helpers/web3-helpers';

@Component
export default class IndexPage extends Vue {}
</script>

<style lang="scss" scoped>
#secondary-section {
    background: #15171c;
}

#faq-section {
    background: #ededed;

    #faq-list {
        .v-expansion-panel {
            border-radius: 0px;
            background: none !important;
        }
        .v-expansion-panel-header {
            font-weight: 600 !important;
            background: white;
        }

        .v-expansion-panel-content {
            word-wrap: break-word;
            padding-top: 16px;
            background: rgba(131, 190, 201, 0.13) !important;
            border: 0.5px solid #478f9c;
            margin-top: 1em;
        }

        .v-expansion-panel-content__wrap {
            background: rgba(131, 190, 201, 0.13) !important;
            margin: 1em !important;
            padding: 16px 24px 16px !important;
        }
    }
}
</style>
