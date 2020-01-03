"use strict"

const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const PnpWebpackPlugin = require("pnp-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const paths = require("./paths")
const resolve = require("resolve")
const ForkTsCheckerWebpackPlugin = require("react-dev-utils/ForkTsCheckerWebpackPlugin")
const typescriptFormatter = require("react-dev-utils/typescriptFormatter")

module.exports = function() {
  return {
    mode: "production" || "development",
    entry: {
      index: "./src"
    },
    output: {
      path: path.resolve(__dirname, paths.appBuild),
      filename: "[name].js",
      libraryTarget: "commonjs2",
      library: "CustomFormReact",
      futureEmitAssets: true,
      publicPath: "./",
      globalObject: "this"
    },
    // optimization: {
    //   minimize: true,
    //   minimizer: [
    //     new TerserPlugin({
    //       terserOptions: {
    //         parse: {
    //           ecma: 8
    //         },
    //         compress: {
    //           ecma: 5,
    //           warnings: false,
    //           comparisons: false,
    //           inline: 2
    //         },
    //         mangle: {
    //           safari10: true
    //         },
    //         output: {
    //           ecma: 5,
    //           comments: false,
    //           ascii_only: true
    //         }
    //       },
    //       cache: true
    //     })
    //   ]
    // },
    resolve: {
      modules: ["node_modules"],
      extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
      alias: {}
    },
    resolveLoader: {},
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: "pre",
          use: [
            {
              options: {
                cache: true,
                formatter: require.resolve("react-dev-utils/eslintFormatter"),
                eslintPath: require.resolve("eslint"),
                resolvePluginsRelativeTo: __dirname
              },
              loader: require.resolve("eslint-loader")
            }
          ],
          include: paths.appSrc,
          exclude: /node_modules/
        },
        {
          test: /\.(ts|tsx)$/,
          include: "/src",
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "./tsconfig.json")
          },
          exclude: /node_modules/
        },
        {
          test: /\.(js|mjs|jsx|tsx?)$/,
          include: paths.appSrc,
          loader: require.resolve("babel-loader"),
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync("typescript", {
          basedir: "src"
        }),
        async: false,
        useTypescriptIncrementalApi: true,
        checkSyntacticErrors: true,
        resolveModuleNameModule: process.versions.pnp ? `${__dirname}/pnpTs.js` : undefined,
        resolveTypeReferenceDirectiveModule: process.versions.pnp
          ? `${__dirname}/pnpTs.js`
          : undefined,
        tsconfig: "./tsconfig.json",
        reportFiles: [
          "**",
          "!**/__tests__/**",
          "!**/?(*.)(spec|test).*",
          "!**/src/setupProxy.*",
          "!**/src/setupTests.*"
        ],
        silent: true,
        // The formatter is invoked directly in WebpackDevServerUtils during development
        formatter: typescriptFormatter
      })
    ].filter(Boolean),
    node: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      http2: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    },
    performance: false
  }
}
