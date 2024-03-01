module.exports = {
    setupFiles: ['./jest.polyfills.js'],
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    // Refer to -> https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-presence-queries.md
    // Suggests to use correct assertion methods
    rules: {
        'testing-library/prefer-presence-queries': [
            'error',
            { absence: false, presence: true },
        ],
    },
    // Enable👇 If you want to use -> jest.setup.js
   //setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}
