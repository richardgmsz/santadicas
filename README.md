# santadicas

Aplicativo simples baseado no PRD do Santa Dicas. Este projeto demonstra um PWA para exibir um cardápio digital e receber pedidos.

## Estrutura
- **server/**: servidor Express que fornece a API e distribui os arquivos estáticos.
- **client/**: PWA mínimo com serviço de cache offline.

## Uso
1. Instale as dependências (é necessário Node.js):
   ```bash
   cd server && npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse `http://localhost:3000` no navegador para visualizar o cardápio.
4. Para visualizar o dashboard de pedidos, abra `http://localhost:3000/dashboard.html`.

### Dashboard

Há também uma página simples de dashboard em `dashboard.html` que lista os pedidos
em tempo real e permite atualizar o status para "preparando" ou "pronto".

Este projeto é um ponto de partida e deve ser expandido conforme os requisitos do PRD.
