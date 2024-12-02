import dotenv from 'dotenv';
import 'reflect-metadata';
import { AppDataSource } from './database/data-source';
import app from './index';

const PORT = parseInt(`${process.env.PORT || 3000}`);

dotenv.config();

AppDataSource.initialize().then(async () => {
    console.log('Database OK');
    app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));
  });



