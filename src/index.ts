import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import encurtadorRoutes from './routes/encurtador-route';
//import urlRoutes from 'src/app/routes/url-route';
import urlRoutes from './app/routes/url-route';


const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(express.json());

app.use(encurtadorRoutes());
app.use(urlRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message);
})

export default app;