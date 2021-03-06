const {Router} = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//get, post, put, delete
//tipos de parâmetros
//query params : request.query
//route params : request.params (IDENTIFICAR um recurso na alteração ou remoção)
//body : request.body - dados para criação ou alteração de um registro

//mongo DB - não relacional

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

routes.get('/', (req, res) => res.send('Servidor ligado!!'));

module.exports = routes;