// https://nuxt.com/docs/api/configuration/nuxt-config

const api_url = process.env.NUXT_API_URL;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,

  runtimeConfig: {
    public: { apiEndpoint: api_url || "http://localhost:1337" },
  },

  css: ["~/assets/css/reset.css", "~/assets/css/main.css"],

  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image"],
});
