import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createProxyMiddleware, Options } from 'http-proxy-middleware'; // Correct import
import { logger } from 'shared-constants';
import http from 'http';
import { PORT, PRODUCT_SERVICE, USER_SERVICE } from './constant';

const app = express();

app.use(cors());
app.use(express.json());

// Request logging middleware (log every incoming request)
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Proxy to User Service
app.use(
  '/api/users',
  createProxyMiddleware({
    target: USER_SERVICE,
    changeOrigin: true,
    onError: (err: Error, req: Request, res: Response, next: NextFunction) => {
      logger.error(`Error proxying to User Service: ${err.message}`);
      res.status(502).json({ error: 'Bad Gateway - User Service unavailable' });
    },
    onProxyReq: (
      proxyReq: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      logger.info(
        `Proxying ${req.method} request to ${USER_SERVICE}${req.url}`
      );
      next(); // Ensure to call next to proceed with the request
    },
  } as Options) // Explicitly type the options to resolve 'onError' issue
);

// Proxy to Product Service
app.use(
  '/api/products',
  createProxyMiddleware({
    target: PRODUCT_SERVICE,
    changeOrigin: true,
    onError: (err: Error, req: Request, res: Response, next: NextFunction) => {
      logger.error(`Error proxying to Product Service: ${err.message}`);
      res
        .status(502)
        .json({ error: 'Bad Gateway - Product Service unavailable' });
    },
    onProxyReq: (
      proxyReq: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      logger.info(
        `Proxying ${req.method} request to ${PRODUCT_SERVICE}${req.url}`
      );
      next(); // Ensure to call next to proceed with the request
    },
  } as Options) // Explicitly type the options to resolve 'onError' issue
);

// Health Check endpoint for monitoring
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'API Gateway is healthy' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Unhandled Error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server with graceful shutdown
const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
});

// Graceful shutdown handling (SIGINT or SIGTERM)
const shutdown = () => {
  logger.info('Shutting down API Gateway...');
  server.close(() => {
    logger.info('API Gateway shut down gracefully');
    process.exit(0);
  });

  // Force shutdown after 10 seconds if the server is not closed
  setTimeout(() => {
    logger.error('Forcefully shutting down after 10 seconds');
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
