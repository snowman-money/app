<template>
    <div class="text-center">
        <div class="title-group d-flex align-center justify-center">
            <img class="mr-3" height="34" width="38.06" :src="icon" />
            <span>{{ title }}</span>
        </div>

        <p v-if="statValue" class="stat">
            {{ formatStat }} {{ statUnit.toUpperCase() }}
        </p>
        <v-skeleton-loader v-else class="mt-3" type="text" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { abbreviateNumber } from '~/helpers/abbreviate-number';
@Component
export default class UserStat extends Vue {
    @Prop(String) readonly title!: string;
    @Prop(String) readonly statValue!: string;
    @Prop(String) readonly statUnit!: string;
    @Prop() readonly icon: any;

    get formatStat() {
        return abbreviateNumber(Number(this.statValue));
    }
}
</script>

<style lang="scss" scoped>
.title-group {
    img {
        display: inline;
    }
    span {
        color: rgba(0, 0, 0, 0.6);
        font-size: 1em;
        text-transform: uppercase;
        font-weight: bold;
    }
}
.stat {
    font-weight: bold;
    font-size: 2.5em;
    color: black;
}
</style>
