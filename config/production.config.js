module.exports = function (config) {
  // config.output = { ...config.output, library: `${appPackageJson.name}`, libraryTarget: "commonjs" }
  return {
    ...config,
    externals: {
      lodash: "lodash",
      moment: "moment",
      react: "react",
      "react-dom": "react-dom",
    },
  }
}
