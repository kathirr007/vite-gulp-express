import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu({

}, {
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },
  languageOptions: { globals: globals.node },
})
