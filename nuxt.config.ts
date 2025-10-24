import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  app: { baseURL: "/" },

  typescript: { typeCheck: true },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "@nuxt/ui",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate",
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      sourcemap: false,
    },
  },
  ssr: false,

  css: ["~/assets/css/main.css"],

  eslint: {
    config: {
      standalone: false,
    },
  },

  imports: {
    dirs: ["api", "api/client", "types"],
  },

  runtimeConfig: {
    public: {
      env: "staging",
      piniaPluginPersistedstate: {
        storage: "localStorage",
      },
    },
  },

  pinia: {
    storesDirs: ["./app/stores/**"],
  },

  i18n: {
    bundle: { optimizeTranslationDirective: false },
    restructureDir: "app",
    langDir: "i18n",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "lang",
    },
    defaultLocale: "en",
    locales: [
      { code: "en", file: "en.json" },
      { code: "id", file: "id.json" },
    ],
  },

  ui: {
    prefix: "UI",
  },

  // icon: {
  //   provider: "server",
  //   mode: "svg",
  //   serverBundle: {
  //     collections: ["solar", "fa6-brands"],
  //   },
  // },
});
