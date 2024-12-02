import request from 'supertest';
import app from '../index';
import { AppDataSource } from '../database/data-source';
import URL from '../app/entities/URL';

// Antes de todos os testes, inicializa a conexão com o banco de dados
beforeAll(async () => {
  await AppDataSource.initialize();
});

// Limpa a tabela de URLs antes de cada teste
beforeEach(async () => {
  const repository = AppDataSource.getRepository(URL);
  await repository.clear();
});

// Depois de todos os testes, fecha a conexão com o banco de dados
afterAll(async () => {
  await AppDataSource.destroy();
});

describe('API de Encurtador de URLs', () => {
  // Teste para criar uma URL encurtada sem alias personalizado
  test('deve criar uma URL encurtada sem alias personalizado', async () => {
    const response = await request(app)
      .post('/')
      .send({ URL: 'http://www.example.com' });

    // Verifica se a resposta contém as propriedades esperadas
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('alias');
    expect(response.body).toHaveProperty('url');
  });

  // Teste para retornar erro se o alias personalizado já existir
  test('deve retornar erro se o alias personalizado já existir', async () => {
    const customAlias = 'example';

    await request(app)
      .post('/')
      .send({ URL: 'http://www.example.com', CUSTOM_ALIAS: customAlias });

    const response = await request(app)
      .post('/')
      .send({ URL: 'http://www.example.com', CUSTOM_ALIAS: customAlias });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      ERR_CODE: '001',
      Description: 'CUSTOM ALIAS ALREADY EXISTS',
    });
  });

  // Teste para recuperar a URL original a partir do alias
  test('deve recuperar a URL original', async () => {
    const customAlias = 'example';

    await request(app)
      .post('/')
      .send({ URL: 'http://www.example.com', CUSTOM_ALIAS: customAlias });

    const response = await request(app).get(`/u/${customAlias}`);

    // Verifica se o redirecionamento está correto
    expect(response.status).toBe(301);
    expect(response.header.location).toBe('http://www.example.com');
  });

  // Teste para retornar erro se o alias não existir
  test('deve retornar erro se o alias não existir', async () => {
    const response = await request(app).get('/u/nonexisting');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      ERR_CODE: '002',
      Description: 'SHORTENED URL NOT FOUND',
    });
  });
});
