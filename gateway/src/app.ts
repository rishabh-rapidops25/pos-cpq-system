import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { logger } from 'shared-constants';
import { PORT, PRODUCT_SERVICE, USER_SERVICE } from './constant';

const app = express();

app.use(cors());
app.use(express.json());

// Proxy to User Service
// This proxy is used to forward requests from the API Gateway to the User Service.
// The `changeOrigin` option ensures that the origin of the host header in the proxied request
// matches the target URL, which is necessary for some backend services to accept the request.
app.use(
  '/api/users',
  createProxyMiddleware({
    target: USER_SERVICE,
    changeOrigin: true,
  })
);

// Proxy to Product Service: Routes requests from '/api/products' to the Product Service.
// This proxy forwards requests to the target URL specified in the PRODUCT_SERVICE_URL environment variable
// or defaults to 'http://product-service:3002' if the variable is not set. It also ensures the origin is changed.

// Proxy to Product Service
app.use(
  '/api/products',
  createProxyMiddleware({
    target: PRODUCT_SERVICE,
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  try {
    logger.info(`API Gateway running on port ${PORT}`);
  } catch (error) {
    logger.error(`Error starting API Gateway: ${error}`);
  }
});
