const { createProxyMiddleware } = require('http-proxy-middleware');

const remoteProxy = process.env.ASIEC_REMOTE_PROXY || console.error('\n\nNo ASIEC_REMOTE_PROXY found, check README.md\n\n');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: remoteProxy,
      changeOrigin: true,
    })
  );
};
