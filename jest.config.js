// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
};

module.exports = config;

// Or async function
module.exports = async () => {
    return {
        setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
        verbose: true,
        "collectCoverage": true
    };
};