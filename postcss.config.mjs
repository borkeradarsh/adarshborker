/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Add cssnano for production CSS minification
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          minifySelectors: true,
          minifyParams: true,
          mergeLonghand: true,
          mergeRules: true,
          convertValues: true,
          discardDuplicates: true,
          discardEmpty: true,
          discardUnused: false, // Keep false to preserve Tailwind classes
        }]
      }
    } : {})
  },
}

export default config
