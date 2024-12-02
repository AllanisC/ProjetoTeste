import { AppDataSource } from './data-source';
import URL from '../app/entities/URL';

async function clearDatabase() {
  await AppDataSource.initialize();
  const repository = AppDataSource.getRepository(URL);
  await repository.clear();
  console.log('Banco de dados limpo antes da compilação');
  await AppDataSource.destroy();
}

clearDatabase().then(() => console.log('Banco de dados limpo'));
