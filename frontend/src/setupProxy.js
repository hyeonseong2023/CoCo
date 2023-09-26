const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8099',
      changeOrigin: true,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://172.30.1.20:8099',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
