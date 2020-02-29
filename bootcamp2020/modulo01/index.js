const express = require('express');
const server = express();

server.use(express.json());//sempre precisa dizer para o express utilizar json

const users = ['Diego', 'Claudio', 'Victor'];

//rota para listar todos os usuários (READ)
server.get('/users', (req, res) => {
    return res.json(users);
});

//rota para listar um unico usuário (READ)
server.get('/users/:index', (req, res) => {
    const { index } = req.params; //para procurar o usuario em determinada posiçao no vetor
    return res.json(users[index]);
});

//rota para criar um usuario CREATE (POST)
server.post('/users', (req, res) => {
    const {name} = req.body;
    users.push(name); //push? para pegar usuario do json e enviar para a var name
    return res.json(users);
});

//rota para editar um usuario PUT (UPDATE)
server.put('/users/:index', (req, res) => {
    //http://localhost:3000/users/1
    const {index } = req.params;
    const { name } = req.body;
    users[index] = name;

    return res.json(users);
});

//rota para deleter um usuário DELETE
server.delete('/users/:index', (req, res) => {
    const {index} = req.params;
    users.splice(index, 1); // splice vai deletar tantas posições
    return res.send();
});

server.listen(3000);