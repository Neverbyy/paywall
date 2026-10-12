export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: false
  },
  css: [
    '@fontsource/nunito/400.css',
    '@fontsource/nunito/600.css',
    '@fontsource/nunito/700.css',
    '@fontsource/nunito/800.css',
    '@fontsource/nunito/900.css',
    '~/assets/css/tokens.css',
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Pro — все игры',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#EEF7FF' }
      ]
    }
  },
  runtimeConfig: {
    supabaseUrl: '',
    supabaseSecretKey: ''
  }
})
