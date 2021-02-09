const express = require('express'); //importando as funcionalidades do express
const cors = require('cors'); 
const routes = require('./routes'); //importando o arquivo de rota

const app = express();

app.use(cors());

app.use(express.json()); //utilizando o formato JSON para lidar com os dados

app.use(routes);

app.listen(3333);//escutando a porta 3333 (localhost:33333)