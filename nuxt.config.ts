// https://nuxt.com/docs/api/configuration/nuxt-config
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
    //'@nuxtjs/robots',
    '@pinia/nuxt',
    '@nuxt/devtools'
  ],
  devtools: {
    enabled: true,

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
      link: [
        { rel: 'icon', type: 'image/png', href: 'image/rock.png' }
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      }
    }
})