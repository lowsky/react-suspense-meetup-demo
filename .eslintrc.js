module.exports = {
    extends: ['next', 'prettier'],
    settings: {
        react: {
            version: 'detect', // React version. "detect" automatically picks the version you have installed.
        },
    },
    plugins: ['prettier'],
    rules: {
        'import/no-anonymous-default-export': 'off',
        'no-undef': 1,
        'no-console': 0,
    },
};
