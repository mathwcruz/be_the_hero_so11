const express = require('express'); //importando as funcionalidades do express

const app = express();
const routes = require('./routes'); //importando o arquivo de rota

app.use(express.json()); //utilizando o formato JSON para lidar com os dados

/*
Banco de Dados:
  Entidades:
    - ONG
    - Caso(Incident), 
  Funcionalidades:
    - Login de ONG
    - Cadastro de ONG
    - Logout de ONG
    - A ONG poderá listar casos específicos a ela
    - A ONG poderá cadastrar novos casos para ela
    - A ONG poderá deletar seus casos
    - Listar todos os casos
    - Entrar em contato com a ONG
*/

app.use(routes);

app.listen(3333);//escutando a porta 3333 (localhost:33333)