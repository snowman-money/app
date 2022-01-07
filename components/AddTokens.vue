<template>
    <div>
        <v-menu open-on-hover offset-y light>
            <template #activator="{ on, attrs }">
                <v-btn
                    color="accent"
                    tile
                    elevation="2"
                    large
                    v-bind="attrs"
                    v-on="on"
                >
                    Add Tokens
                </v-btn>
            </template>
            <v-card class="mx-auto" width="300" tile>
                <v-list class="px-20">
                    <v-list-item
                        v-for="(token, index) in tokens"
                        :key="index"
                        @click="addToken(token)"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                Add
                                <span class="font-weight-bold"
                                    >${{ token.toUpperCase() }}</span
                                >
                                to wallet</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { SupportedTokens } from '@/constants/blockchain';

@Component
export default class AddTokens extends Vue {
    async addToken(token: SupportedTokens) {
        await this.$web3.addToken(token);
    }

    tokens: SupportedTokens[] = [SupportedTokens.SNOWMAN, SupportedTokens.TIME];
}
</script>

<style></style>
