// api/proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

const backendURL = 'http://44.221.163.198'; // Replace with your actual backend URL

export default createProxyMiddleware({
  target: backendURL,
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('X-Forwarded-Proto', 'http');
  },
  pathRewrite: (path, req) => {
    if (path.startsWith('/api/predict')) {
      const dynamicPart = path.replace('/api/predict/', '');
      return `/predict/${dynamicPart}`;
    }

    if (path.startsWith('/api/history')) {
      return '/history';
    }

    // No path rewrite for other requests
    return path;
  },
});
