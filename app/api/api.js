// api/routes/api.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'http://44.221.163.198',
  changeOrigin: true,
  pathRewrite: (path, req) => {
    console.log(`Original path: ${path}`);

    const predictionMatch = path.match(/^\/api\/predict\/(.+)$/);
    if (predictionMatch) {
      const dynamicPart = predictionMatch[1];
      console.log(`Dynamic part: ${dynamicPart}`);
      return `/predict/${dynamicPart}`;
    }

    if (path.startsWith('/api/history')) {
      console.log('Handling history endpoint');
      return '/history';
    }

    return path;
  },
});
