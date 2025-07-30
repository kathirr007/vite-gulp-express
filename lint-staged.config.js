import micromatch from 'micromatch'

export default {
  'frontend/**/*.{js,ts,vue},json': (files) => {
    // Exclude specific files from linting
    // This is useful for files that are auto-generated or not meant to be linted
    // For example, you might want to exclude 'typed-router.d.ts', 'components.d.ts', and 'auto-imports.d.ts'
    const match = micromatch.not(files, 'typed-router.d.ts', 'components.d.ts', 'auto-imports.d.ts')
    return `eslint --no-warn-ignored --config frontend/eslint-config.js --cache --fix ${match.join(' ')}`
  },
  '*.{js,ts,json}': (files) => {
    // Exclude specific files from linting
    // This is useful for files that are auto-generated or not meant to be linted
    // For example, you might want to exclude 'typed-router.d.ts', 'components.d.ts', and 'auto-imports.d.ts'
    const match = micromatch.not(files, '**/typed-router.d.ts', '**/components.d.ts', '**/auto-imports.d.ts')
    return `eslint --no-warn-ignored --cache --fix ${match.join(' ')}`
  },
}
