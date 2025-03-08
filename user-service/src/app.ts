import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { HOST, NODE_ENV, PORT } from './constants';
import { logger } from 'shared-constants';
import { AppDataSource } from './db';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

if (NODE_ENV === 'development') {
  app.use('*', (req: Request, _res: Response, next: NextFunction) => {
    logger.info(
      '==========> req url:',
      req.url,
      '==========> req method:',
      req.method
    );
    next();
  });
}
app.use('/api/users', userRoutes);

export const startServer = () => {
  AppDataSource.initialize()
    .then(() => {
      logger.info(`===============================================`);
      if (!PORT) {
        logger.error('❌ PORT is not defined. Server cannot start.');
        return;
      }
      app.listen(PORT, () => {
        logger.info(`User-Service Server is running on port ${PORT}`);
        if (HOST) {
          logger.info(`http://${HOST}:${PORT}/api/users`);
          logger.info('✅ Database Connected Successfully....');
          logger.info(`===============================================`);
        } else {
          logger.warn('HOST is not defined. URL may be incorrect.');
        }
      });
    })
    .catch((err) => {
      logger.error(`❌ Error initializing DataBase: ${err.message}`, err);
    });
};
