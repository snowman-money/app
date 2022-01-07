<template>
    <v-app dark :class="$vuetify.breakpoint.name">
        <v-app-bar
            id="app-bar"
            color="white"
            height="97"
            elevation="0"
            fixed
            app
        >
            <div
                class="d-flex flex-md-row flex-column flex-sm-column align-center"
                style="width: 100%"
            >
                <SnowmanLogo />
                <v-spacer class="d-none d-md-flex" />
                <div class="d-none d-md-flex">
                    <AddTokens class="mr-10" />
                    <ConnectWallet />
                </div>
            </div>
        </v-app-bar>
        <v-main>
            <Nuxt />
        </v-main>

        <v-footer
            class="white justify-center align-center pt-5"
            height="105"
            :absolute="fixed"
            app
        >
            <p class="text-subtitle-1 text-center font-weight-bold">
                Created for Snowmen, by Snowmen <br />(and Snowwomen)
            </p>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data() {
        return {
            fixed: true,
        };
    },
};
</script>

<style lang="scss" scoped>
// .xs,
// .sm {
//     #app-bar {
//         background: red !important;
//         height: 200px !important;
//     }
//     .v-toolbar__content {
//         background: red !important;
//         height: 200px !important;
//     }
// }
</style>
