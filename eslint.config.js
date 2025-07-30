import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu({

}, {
  ignores: ['**/typed-router.d.ts', '**/components.d.ts', '**/auto-imports.d.ts'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },
  languageOptions: { globals: globals.node },
})
