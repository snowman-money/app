<template>
    <div class="text-center">
        <div class="title-group d-flex align-center justify-center">
            <span :style="{ fontSize: 0.7 * fontScale + 'em' }">{{
                title
            }}</span>
        </div>
        <p
            v-if="statValue"
            class="stat"
            :style="{ fontSize: 2.1 * Number(fontScale) + 'em' }"
        >
            {{ currency }}{{ formatStat }} {{ statUnit.toUpperCase() }}
        </p>
        <v-skeleton-loader v-else class="mt-3" type="text" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { abbreviateNumber } from '~/helpers/abbreviate-number';

@Component
export default class BasicStat extends Vue {
    @Prop(String) readonly title!: string;
    @Prop(String) readonly statValue!: string;
    @Prop({ default: '', type: String }) readonly statUnit!: string;
    @Prop({ default: '', type: String }) readonly currency!: string;
    @Prop({ default: '1', type: String }) readonly fontScale!: string;

    get formatStat() {
        return abbreviateNumber(Number(this.statValue));
    }
}
</script>

<style lang="scss" scoped>
.title-group {
    span {
        color: rgba(255, 255, 255, 0.3);
        text-transform: uppercase;
        font-weight: bold;
    }
}
.stat {
    font-weight: bold;
    color: white;
}
</style>
