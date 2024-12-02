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


//AppDataSource.initialize().then(async () => {
//
//    console.log("Inserting a new user into the database...")
//    const user = new User()
//    user.firstName = "Timber"
//    user.lastName = "Saw"
//    user.age = 25
//    await AppDataSource.manager.save(user)
//    console.log("Saved a new user with id: " + user.id)
//
//    console.log("Loading users from the database...")
//    const users = await AppDataSource.manager.find(User)
//    console.log("Loaded users: ", users)
//
//    console.log("Here you can setup and run express / fastify / any other framework.")
//
//}).catch(error => console.log(error))
