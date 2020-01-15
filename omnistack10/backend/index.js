const express = require('express');

const app = express();

app.use(express.json());

//Métodos Http : GET, PUT, POST, DELETE

//Tipos de parametros do express
//Query Params(get) - req.query (filtros, ordenação)
//Route Params(delete) - req.params (identificar um recurso na alteração)
//Body(post) - body do json para criar propriedades

app.post('/users', (req, res) => {
    console.log(req.body)
    return res.json({message: 'Hello World'});
});

app.listen(3333);