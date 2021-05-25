const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const packages = [];
packages.push(path.join(__dirname, "src/"));

module.exports = {
    webpack: {
        alias: {},
        plugins: [],
        configure: (webpackConfig, args) => {
            const { isFound, match } = getLoader(webpackConfig, loaderByName("babel-loader"));
            if (isFound) {
                const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];
                match.loader.include = include.concat(packages);
            }
            return webpackConfig;
        },
    },
};
