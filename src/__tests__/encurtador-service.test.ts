import EncurtadorService from '../service/encurtador-service';
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

describe('EncurtadorService', () => {
  const encurtadorService = new EncurtadorService();

  test('deve criar uma URL encurtada sem alias personalizado', async () => {
    const data = { URL: 'http://www.example.com' };
    const result = await encurtadorService.gravar(data);

    expect(result).toHaveProperty('alias');
    expect(result).toHaveProperty('url');
    expect(result.url).toMatch(/http:\/\/shortener\/u\//);
  });

  test('deve recuperar a URL original', async () => {
    const alias = 'example';
    const data = { URL: 'http://www.example.com', CUSTOM_ALIAS: alias };

    await encurtadorService.gravar(data);

    const result = await encurtadorService.recuperar(alias);
    expect(result).toHaveProperty('original_url', 'http://www.example.com');
  });

  test('deve retornar erro se o alias personalizado já existir', async () => {
    const data = { URL: 'http://www.example.com', CUSTOM_ALIAS: 'example' };

    await encurtadorService.gravar(data);

    await expect(encurtadorService.gravar(data)).rejects.toEqual({
      ERR_CODE: '001',
      Description: 'CUSTOM ALIAS ALREADY EXISTS',
    });
  });

  test('deve retornar erro se o alias não existir', async () => {
    const alias = 'nonexisting';

    await expect(encurtadorService.recuperar(alias)).rejects.toEqual({
      ERR_CODE: '002',
      Description: 'SHORTENED URL NOT FOUND',
    });
  });
});
