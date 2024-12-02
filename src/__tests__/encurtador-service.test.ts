import EncurtadorService from '../service/encurtador-service';
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

describe('EncurtadorService', () => {
  const encurtadorService = new EncurtadorService();

  // Teste para criar uma URL encurtada sem alias personalizado
  test('deve criar uma URL encurtada sem alias personalizado', async () => {
    const data = { URL: 'http://www.example.com' };
    const result = await encurtadorService.gravar(data);

    // Verifica se o resultado contém as propriedades esperadas
    expect(result).toHaveProperty('alias');
    expect(result).toHaveProperty('url');
    expect(result.url).toMatch(/http:\/\/shortener\/u\//);
  });

  // Teste para recuperar a URL original a partir do alias
  test('deve recuperar a URL original', async () => {
    const alias = 'example';
    const data = { URL: 'http://www.example.com', CUSTOM_ALIAS: alias };

    await encurtadorService.gravar(data);

    const result = await encurtadorService.recuperar(alias);
    expect(result).toHaveProperty('original_url', 'http://www.example.com');
  });

  // Teste para retornar erro se o alias personalizado já existir
  test('deve retornar erro se o alias personalizado já existir', async () => {
    const data = { URL: 'http://www.example.com', CUSTOM_ALIAS: 'example' };

    await encurtadorService.gravar(data);

    await expect(encurtadorService.gravar(data)).rejects.toEqual({
      ERR_CODE: '001',
      Description: 'CUSTOM ALIAS ALREADY EXISTS',
    });
  });

  // Teste para retornar erro se o alias não existir
  test('deve retornar erro se o alias não existir', async () => {
    const alias = 'nonexisting';

    await expect(encurtadorService.recuperar(alias)).rejects.toEqual({
      ERR_CODE: '002',
      Description: 'SHORTENED URL NOT FOUND',
    });
  });
});
