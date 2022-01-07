import colors from 'vuetify/es5/util/colors';

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        // titleTemplate: '%s - nft-plus-studio',
        title: 'Snowman DAO - Claim',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'Snowman DAO is building a vibrant ecosystem that rewards you 80,000% for holding! Hold SNOWMAN, earn TIME',
            },
            { name: 'format-detection', content: 'telephone=no' },
            {
                name: 'msapplication-TileColor',
                content: '#da532c',
            },
            {
                name: 'theme-color',
                content: '#000000',
            },
            {
                property: 'og:type',
                content: 'website',
            },
            {
                property: 'og:url',
                content: 'https://claim.snowman.money',
            },
            {
                property: 'og:title',
                content: 'Snowman DAO - Claim',
            },
            {
                property: 'og:description',
                content:
                    'Snowman DAO is building a vibrant ecosystem that rewards you 80,000% for holding! Hold SNOWMAN, earn TIME',
            },
            {
                property: 'og:image',
                content:
                    'http://68.183.56.8:8000/wp-content/uploads/2021/12/Snowman-gif.gif',
            },
            {
                property: 'twitter:card',
                content: 'summary_large_image',
            },
            {
                property: 'twitter:url',
                content: 'https://claim.snowman.money',
            },
            {
                property: 'twitter:title',
                content: 'Snowman DAO - Claim',
            },
            {
                property: 'twitter:description',
                content:
                    'Snowman DAO is building a vibrant ecosystem that rewards you 80,000% for holding! Hold SNOWMAN, earn TIME',
            },
            {
                property: 'twitter:image',
                content:
                    'http://68.183.56.8:8000/wp-content/uploads/2021/12/Snowman-gif.gif',
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'apple-touch-icon',
                type: '180x180',
                href: '/apple-touch-icon.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png',
            },
            {
                rel: 'manifest',
                href: '/site.webmanifest',
            },
            {
                rel: 'mask-icon',
                href: '"/safari-pinned-tab.svg',
                color: '#5bbad5',
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/web3'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
        '@nuxtjs/google-fonts',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        treeShake: true,
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: '#57E0FA',
                    accent: '#2B2B2B',
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    googleFonts: {
        families: {
            Poppins: [100, 300, 400, 500, 600, 700, 800, 900],
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
};
