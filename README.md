## HIRE.ME - ENCURTADOR - allanis  
### antes de rodar
Foi construído um BD (mysql) localmente para a execução das funcionalidades.  
O BD possui uma tabela com as seguintes colunas: id(auto), origin_url, alias(unique), shortened_url, access_count(default:0)  

### rodando
```
npm i
npm run compile
```
#### para subir a tabela do BD (pré-existente)
```npm run typeorm -- -d ./src/database/data-source.ts migration:run```

```
npm run dev
```

