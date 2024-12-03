const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
  target: 'http://localhost:3000', // Servidor alvo que seu Live Server vai apontar
  changeOrigin: true,
}));

app.listen(5001, () => { // Note que estamos usando a porta 5001 aqui para o proxy
  console.log('Proxy server listening on port 5001');
});
