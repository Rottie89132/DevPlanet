// https://nuxt.com/docs/api/configuration/nuxt-config
// import path from 'path'
// import fs from 'fs'

export default defineNuxtConfig({
  modules: [ 
    '@vue-macros/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-mongoose',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxtjs/device',
    'nuxt-scheduler', 
    '@pinia/nuxt',
    '@nuxt/devtools',
    '@formkit/auto-animate/nuxt',
    '@element-plus/nuxt'
  ], 
  elementPlus: { 
    themes: ['dark'],
  },
  devtools: {
    enabled: false,

    timeline: {
      enabled: true
    },
  },
  tailwindcss: {
    configPath: "tailwind.config.js",
  },
  mongoose: {
    uri: process.env.DataBaseUrl,
  },
  runtimeConfig: {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    clientToken: process.env.token,
    PrivateWorkerKey: process.env.VapidPrivate,
    public: {
      WorkerKey: process.env.VapidPublic,
      SocketPORT: process.env.SocketPORT
    }
  },
  pinia: {
    autoImports: [
      'defineStore', 
      ['defineStore', 'definePiniaStore'], 
    ],
  },
  nitro: {
    compressPublicAssets: true,
  }, 
  colorMode: {
    classSuffix: '', 
  },
  pwa: {
    strategies: "injectManifest",
    manifest: {
      name: "DevPlanet",
      short_name: "DevPlanet",
      description: "Welcome to this website",
      orientation: "portrait-primary",
      background_color: "#101010",
      theme_color: "#101010",
      display_override: ["window-controls-overlay", "standalone", "minimal-ui", "fullscreen", "browser"],
      icons: [
        {
          src: "icons/icon_144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/icon_192.png",
          sizes: "192x192",
          type: "image/svg",
        },
        {
          src: "icons/icon_512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ]
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: "module"
    },
  }, 
  app: {
    head: {
      meta: [
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: "#F8F8F8" }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: 'image/rock.png' }
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      }
    }
})