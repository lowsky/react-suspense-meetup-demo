module.exports = {
    extends: ['next'],
    settings: {
        react: {
            version: 'detect', // React version. "detect" automatically picks the version you have installed.
        },
    },
    rules: {
        'import/no-anonymous-default-export': 'off',
        'no-undef': 1,
        'no-console': 0,
    },
};
