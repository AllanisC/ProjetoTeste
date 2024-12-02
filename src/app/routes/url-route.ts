import { Router } from 'express';
import urlRouter from '../controllers/url-controller';

const routers = Router();

routers.use('/urls', urlRouter);

export default routers;