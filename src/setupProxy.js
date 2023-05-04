// eslint-disable-next-line no-undef
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = {
  '/api': 'https://api-training.hrm.div4.pgtest.co/api/v1',
};

// eslint-disable-next-line no-undef
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api-training.hrm.div4.pgtest.co/api/v1',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '',
      },
      onProxyReq: function (proxyReq, req, res) {
        proxyReq.removeHeader('Origin');
      },
      router,
      logLevel: 'debug',
    }),
  );
};
