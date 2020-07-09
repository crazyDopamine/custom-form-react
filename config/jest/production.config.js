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
        antd: 'antd',
        axios: 'axios',
        lodash: 'lodash',
        moment: 'moment',
        qs: 'qs',
        react: 'react',
        'react-dom': 'react-dom',
        'react-router': 'react-router',
        'react-redux': 'react-redux',
        'redux-saga': 'redux-saga',
        'forward-ref': 'forward-ref',
        xlsx: 'xlsx',
        'react-custom-scrollbars': 'react-custom-scrollbars',
        'qiniu-js': 'qiniu-js'
      }
    ]
  };
};
