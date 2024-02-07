// routes/api.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'http://44.221.163.198',
  changeOrigin: true,
  pathRewrite: (path, req) => {
    // Handle dynamic prediction path
    if (path.startsWith('/api/predict')) {
      const dynamicPart = path.replace('/api/predict/', '');
      return `/predict/${dynamicPart}`;
    }

    // Handle other endpoints, e.g., /api/history
    if (path.startsWith('/api/history')) {
      return '/history';
    }

    // Default path rewrite if no match
    return path;
  },
});
