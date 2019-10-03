const express = require('express');

const routes = express.Router(); //pegando o roteador do express e separando dentro da variavel 

routes.post('/users' , (req, res)=> {
     return res.json(req.body);
});

//exportar 

module.exports = routes; 