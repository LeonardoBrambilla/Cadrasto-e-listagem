# Sobre o Projeto
- Este projeto é formulario com listagem de produtos
- Da para ver o projeto pelo https://cadrasto-e-listagem.vercel.app/

# Configuração do projeto
- FrameWork React para o frontend
- Vite para o desenvolimento do projeto
- Material-UI para estilização de componentes e icones
- MongoDB para guardar informações


# Como rodar esse projeto
```sh
git clone https://github.com/LeonardoBrambilla/Cadrasto-e-listagem.git
npm install in './' e './server'
`./` npm run dev
`./server` npm start
```

# Estrutura do Projeto
- `./src/App.jsx`: Is the configuration of the routes
- `./client/src/components`: São os componentes do projeto
- `./server/models`: É o modelo de bando de dados
- `./server/routes`: São as rotas de cada serviço


Requisito: 𝐂𝐚𝐝𝐚𝐬𝐭𝐫𝐨 𝐞 𝐥𝐢𝐬𝐭𝐚𝐠𝐞𝐦 𝐝𝐞 𝐩𝐫𝐨𝐝𝐮𝐭𝐨𝐬

Cadrasto:

- Formulário com os campos abaixo:

  - [X] Nome do produto - campo de texto 
  - [X] Descrição do produto - campo de texto
  - [X] Valor do produto - campo de valor
  - [X] Disponível para venda - campo com 2 opções: sim / não

Listagem:

- [X] Colunas da listagem: nome, valor
- [X] Ordenação por valor do menor para o maior
- [X] Quando cadastrar um novo produto é para abrir a listagem automaticamente
- [X] Deve existir um botão para cadastrar um novo produto a partir da listagem

Implementação adicionais:

- Botão de remover
- Descrição de cada item



