import micromatch from 'micromatch'

export default {
  'client/**/*.{js, mjs, ts, mts, vue, json}': (files) => {
    // Exclude specific files from linting
    // This is useful for files that are auto-generated or not meant to be linted
    // For example, you might want to exclude 'typed-router.d.ts', 'components.d.ts', and 'auto-imports.d.ts'
    const match = micromatch.not(files, 'shims.d.ts', 'typed-router.d.ts', 'components.d.ts', 'auto-imports.d.ts')
    return `eslint --config client/eslint.config.js --no-warn-ignored --cache --fix ${match.join(' ')}`
  },
  '*.{js, mjs, ts, mts, json}': (files) => {
    // Exclude specific files from linting
    // This is useful for files that are auto-generated or not meant to be linted
    // For example, you might want to exclude 'typed-router.d.ts', 'components.d.ts', and 'auto-imports.d.ts'
    const match = micromatch.not(files, '**/typed-router.d.ts', '**/components.d.ts', '**/auto-imports.d.ts')
    return `eslint --no-warn-ignored --cache --fix ${match.join(' ')}`
  },
}
