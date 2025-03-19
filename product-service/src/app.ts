import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT, HOST, NODE_ENV } from './constants';
import { connectDB } from './config/mongodb';
import { authMiddleware } from 'auth-lib';
import { logger } from 'shared-constants';
import indexRoutes from './routes/indexRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// if (NODE_ENV === 'development') {
//   app.use('*', (req: Request, _res: Response, next: NextFunction) => {
//     const logMessage = `Request method: ${req.method}, Request URL: ${req.originalUrl}`;
//     logger.info(logMessage);
//     next();
//   });
// }

app.use('/api', authMiddleware, indexRoutes);

export const startServer = () => {
  try {
    connectDB(); // Connect to MongoDB
    const portNumber = PORT ? parseInt(PORT, 10) : NaN;
    if (isNaN(portNumber)) {
      logger.error('❌ Invalid PORT number:', PORT);
      process.exit(1);
    }
    if (HOST) {
      logger.info(`===============================================`);
      logger.info(`http://${HOST}:${PORT}/api/products`);
    } else {
      logger.warn('HOST is not defined, unable to log the URL.');
    }
    app.listen(portNumber, () => {
      logger.info('✅ Database Connected Successfully....');
      logger.info(`Product-Service Server is running on port ${PORT}`);
      logger.info(`===============================================`);
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('❌ Error starting the server:', error.message);
      logger.error(error.stack);
    } else {
      logger.error('❌ Error starting the server:', error);
    }
    process.exit(1); // Exit process on failure
  }
};
