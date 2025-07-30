import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
}, {
  ignores: ['**/typed-router.d.ts', '**/components.d.ts', '**/auto-imports.d.ts'],

})
