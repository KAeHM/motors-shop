import { Router } from 'express';
import userSessionController from '../controllers/user/userSession/userSession.controller';

const routes = Router();

const userSessionsRoute = () => {

    routes.post('/login', userSessionController);

    return routes
}



export default userSessionsRoute;
