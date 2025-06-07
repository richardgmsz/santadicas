# Carol Soares LASH

Exemplo de aplicativo PWA para o salão **Carol Soares LASH**, especializado em extensão de cílios e unhas de gel. O projeto é baseado no exemplo "santadicas" e serve como ponto de partida para um sistema de pedidos.

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
3. Acesse `http://localhost:3000` no navegador para visualizar o menu de serviços.

Edite `server/menu.json` para adicionar ou alterar serviços do salão.
