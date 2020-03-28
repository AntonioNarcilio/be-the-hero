// importando o modulo express para a variável express
const express = require('express');
// modula que determina que pode acessar a aplicação
const cors = require('cors');
// importando routes/rotas
const routes = require('./routes');
// criando variável para armazenar a aplicação
const app = express();

// modula para aplicação que esta em desenvolvimento
app.use(cors());

// * informando ao app que sera utilizado o json como corpo das requisições
// * transformando o json em algo que o js intenda
app.use(express.json());

app.use(routes);

// acessar aplicação pela porta: 333
app.listen(3333);
