const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

// rota de login
routes.post('/sessions', SessionController.create);


// Listando todas as ongs cadastradas no banco de dados
routes.get('/ongs', OngController.index);
// criando rota de cadastro de uma ong
routes.post('/ongs', OngController.create);


// listando casos de uma determinada ong 'logada'
routes.get('/profile', ProfileController.index);


// Listando todas os incidentes cadastradas no banco de dados
routes.get('/incidents', IncidentController.index);
// criando rota de criação de um incidente
routes.post('/incidents', IncidentController.create);
// deletar incidente
routes.delete('/incidents/:id', IncidentController.delete);

// deixando as rotas disponíveis para o app acessar
module.exports = routes;
