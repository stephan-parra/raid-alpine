// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Static site generation for GitHub Pages
  ssr: false,

  app: {
    // Update this to your GitHub repo name if not using custom domain
    // e.g., baseURL: '/raid-alpine/' for https://username.github.io/raid-alpine/
    baseURL: process.env.NUXT_APP_BASE_URL || '/',

    head: {
      title: 'RAID Alpine | Lake Geneva to Nice',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'RAID Alpine: A 770km cycling adventure through the French Alps, from Lake Geneva to Nice. Conquer legendary cols including Galibier, Iseran, and Bonette.'
        },
        { name: 'theme-color', content: '#0f172a' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'RAID Alpine | Lake Geneva to Nice' },
        { property: 'og:description', content: '770km through the French Alps. 18,000m of climbing. 6 epic days.' },
        { property: 'og:image', content: '/images/og-image.jpg' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Bebas+Neue&display=swap'
        },
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
  ],

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
  },

  // GitHub Pages compatibility
  nitro: {
    preset: 'github-pages',
  },

  // Enable TypeScript strict mode
  typescript: {
    strict: true,
  },

  compatibilityDate: '2024-09-01',
})
