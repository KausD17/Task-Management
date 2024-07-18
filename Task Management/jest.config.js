const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver']
};


module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'html'],
    transform: {
        '^.+\\.(js|html)$': 'babel-jest'
    },
    moduleNameMapper: {
        '^c/(.*)$': '<rootDir>/force-app/main/default/lwc/$1/$1'
    },
    setupFiles: ['<rootDir>/jest.setup.js']
};
