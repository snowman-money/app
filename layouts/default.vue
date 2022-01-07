<template>
    <v-app dark>
        <v-app-bar color="white" height="97" elevation="0" fixed app>
            <SnowmanLogo />
            <v-spacer class=".d-sm-none .d-md-flex" />
            <div class="d-flex flex-row">
                <AddTokens class="mr-10" />
                <ConnectWallet />
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
                Created for Snowmen, for Snowmen <br />(and Snowwomen)
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
