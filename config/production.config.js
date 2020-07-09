module.exports = function (config) {
  // config.output = { ...config.output, library: `${appPackageJson.name}`, libraryTarget: "commonjs" }
  return {
    ...config,
    externals: [
      function (context, request, callback) {
        if (/^antd\/es\//.test(request)) {
          return callback(null, 'commonjs ' + request);
        }
        callback();
      },
      {
        lodash: 'lodash',
        moment: 'moment',
        react: 'react',
        'react-dom': 'react-dom'
      }
    ]
  };
};
