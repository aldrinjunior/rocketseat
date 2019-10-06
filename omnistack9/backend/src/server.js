const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack9-8nfwh.mongodb.net/semana9?retryWrites=true&w=majority' , {
     useNewUrlParser: true,
     useUnifiedTopology: true,
})
//GET, POST, PUT, DELETE (Métodos importantes para API REST) CRUD

//get é para listar alguma coisa do backend (ex : listar usarios)
//post é para criar uma nova inf no backend (ex : cadastro de usuarios)
//put serve para editar
//delete delatar os bgl

// req.query = Acessar query params(para filtros)
// req.params = acessar route params (para edição, delete)
// req.body = acessar o corpo da requisição (para criação, edição)

app.use(express.json());
app.use(routes);

app.listen(3333); 