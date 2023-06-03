const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {
      // target: 'http://192.168.24.8:3001',
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};
