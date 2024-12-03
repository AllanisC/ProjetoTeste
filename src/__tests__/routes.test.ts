import request from 'supertest';
import app from '../index';
import { AppDataSource } from '../database/data-source';
import URL from '../app/entities/URL';

beforeAll(async () => {
  await AppDataSource.initialize();
});

beforeEach(async () => {
  const repository = AppDataSource.getRepository(URL);
  await repository.clear();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('API de Encurtador de URLs', () => {
  test('deve criar uma URL encurtada sem alias personalizado', async () => {
    const response = await request(app)
      .post('/')
      .send({ URL: 'http://www.example.com' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('alias');
    expect(response.body).toHaveProperty('url');
  });

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

  test('deve recuperar a URL original', async () => {
    const customAlias = 'example';

    await request(app)
      .post('/')
      .send({ URL: 'http://www.example.com', CUSTOM_ALIAS: customAlias });

    const response = await request(app).get(`/u/${customAlias}`);

    expect(response.status).toBe(301);
    expect(response.header.location).toBe('http://www.example.com');
  });

  test('deve retornar erro se o alias não existir', async () => {
    const response = await request(app).get('/u/nonexisting');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      ERR_CODE: '002',
      Description: 'SHORTENED URL NOT FOUND',
    });
  });
});
