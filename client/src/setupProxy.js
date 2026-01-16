const { createProxyMiddleware } = require('http-proxy-middleware');

const PROD_API_URL = 'https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com';

module.exports = function (app) {
    app.use(
        '/v1',
        createProxyMiddleware({
            target: PROD_API_URL,
            changeOrigin: true,
            secure: false,
            cookieDomainRewrite: {
                '*': 'localhost',
            },

            // 3. DEBUGGING
            // See exactly what cookies are coming back from Prod
            onProxyRes: (proxyRes) => {
                const cookies = proxyRes.headers['set-cookie'];
                if (cookies) {
                    console.log('[Proxy] Received Cookies from Prod:', cookies);
                    // The 'cookieDomainRewrite' option above handles the fix automatically,
                    // but this log confirms you are actually hitting Prod.
                }
            },
        })
    );
};