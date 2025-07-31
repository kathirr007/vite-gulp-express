import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
}, {
  // ignores: ['**/typed-router.d.ts', '**/components.d.ts', '**/auto-imports.d.ts'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },
  plugins: [
    {
      name: '@antfu/unocss',
      configFile: './uno.config.ts', // <-- Point to your frontend config
    },
  ],
})
