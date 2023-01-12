import { Express } from 'express';
import commentsRoutes from './comments.routes';
import listingsRoutes from './listings.routes';
import userRoutes from './user.routes';
import userSessionsRoute from './userSession.routes';

export const appRoutes = (app: Express) => {
  app.use('/listings', listingsRoutes());
  app.use('/comments', commentsRoutes());
  app.use('/user', userRoutes());
  app.use('/', userSessionsRoute());
};
