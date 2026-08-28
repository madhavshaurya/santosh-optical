// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    shim: false
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      formspreeId: process.env.NUXT_PUBLIC_FORMSPREE_ID,
    }
  },
  nitro: {
    output: {
      publicDir: 'dist'
    }
  },
  app: {
    head: {
      title: "Santosh Optical - Optical Store",
      htmlAttrs: {
        lang: 'en'
      },
      "meta": [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "charset": "utf-8"
        },
        {
          "http-equiv": 'X-UA-Compatible', content: "IE=edge"
        },
        {
          name: 'keywords',
          content: 'Best Optical Store in Patna, Eye glasses, Contact lenses, Sunglasses, Eye care, Santosh Optical, Patna Optician'
        },
        {
          name: 'description',
          content: 'Santosh Optical - The best optical store in Patna. Discover a wide range of premium eye glasses, contact lenses, and sunglasses. Expert eye care services available.'
        },
        {
          name: 'author',
          content: 'Santosh Optical'
        },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://santoshoptical.com/' },
        { property: 'og:title', content: 'Santosh Optical - Best Optical Store in Patna' },
        { property: 'og:description', content: 'Discover premium eyewear and expert eye care at Santosh Optical, Patna. Best collection of glasses and lenses.' },
        { property: 'og:image', content: 'https://santoshoptical.com/assets/imgs/logo-light.png' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://santoshoptical.com/' },
        { name: 'twitter:title', content: 'Santosh Optical - Best Optical Store in Patna' },
        { name: 'twitter:description', content: 'Discover premium eyewear and expert eye care at Santosh Optical, Patna.' },
        { name: 'twitter:image', content: 'https://santoshoptical.com/assets/imgs/logo-light.png' }
      ],
      "link": [
        { rel: 'shortcut icon', href: '/assets/imgs/favicon.ico' },
        // Google Fonts
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap' },
        // CSS
        { rel: 'stylesheet', href: '/assets/fonts/mona-sans/style.css' },
        { rel: 'stylesheet', href: '/assets/css/plugins.css' },
        { rel: 'stylesheet', href: '/assets/css/style.css' },
      ],
      "script": [
        { src: '/assets/js/bootstrap.bundle.min.js' },
        { src: '/assets/js/plugins.js' },
        { src: '/assets/js/isotope.pkgd.min.js' },
        { src: '/assets/js/wow.min.js' },
        { src: '/assets/js/gsap.min.js' },
        { src: '/assets/js/ScrollTrigger.min.js' },
        { src: '/assets/js/ScrollSmoother.min.js' },
        // { src: '/assets/js/smoother-script.js', defer: true },
        { src: '/assets/js/scripts.js', defer: true },
      ]
    }
  },
  css: [
    'swiper/css/bundle',
    '@/styles/globals.css'
  ],
  webpack: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        layouts: true
      }
    }
  }
})
