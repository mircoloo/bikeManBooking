
module.exports = async () => {
    return {
        setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
        verbose: true,
        collectCoverage: true,
        testEnvironment: "node",
    };
};