// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@vue-macros/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxtjs/device',
    'nuxt-scheduler',
    '@pinia/nuxt',
    '@nuxt/devtools',
    '@formkit/auto-animate/nuxt',
    'nuxt-mongoose'
  ], 
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
    PusherAppID: process.env.PusherAppID,
    PusherAppSecret: process.env.PusherAppSecret,
    PrivateWorkerKey: process.env.VapidPrivate,
    public: {
      PusherAppKey: process.env.PusherAppKey,
      cluster: process.env.cluster,
      WorkerKey: process.env.VapidPublic,
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
      screenshots: [
        {
          "src": "image/320x320.png",
          "sizes": "320x320",
          "type": "image/png",
          "form_factor": "wide",
          "label": "DevPlanet"
        },
        {
          "src": "image/320x320.png",
          "sizes": "320x320",
          "type": "image/png",
          "label": "DevPlanet"
        }
      ],
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