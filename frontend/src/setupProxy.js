const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/recent', // '/recent' 경로로 들어오는 요청만을 프록시로 보냅니다.
    createProxyMiddleware({
      target: 'http://localhost:8099', // 백엔드 서버의 주소로 변경하세요.
      changeOrigin: true, // CORS 이슈를 해결하기 위해 필요합니다.
    })
  );
};
