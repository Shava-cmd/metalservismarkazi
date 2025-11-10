// https://nuxt.com/docs/api/configuration/nuxt-config

const apiEndpointAddress = "localhost:1337";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },  

  runtimeConfig: {
    public: { apiEndpoint: apiEndpointAddress },
  },

  css: [
    '~/assets/css/main.css'
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image'
  ]
})