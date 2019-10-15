const express = require('express');

const server = express();

server.use(express.json());

    //query params = ?teste=1
    //route params = /users/1
    //request body = { "name": Aldrin, "email": aldrinjunior@gmail.com}
    
    //CRUD
const users = ['Diego', 'AldrinJr', 'Cláudio'];
//middleware global que vai ser chamado 
server.use((req, res, next) => { 
    console.time('Request');
    console.log(`Método: ${req.method}; URL:{req.url}`); //faz o log a cada requisição
    next();    //fazer continuar as proximas rotas
    console.timeEnd('Request');
});
//middleware local
function checkUserExists(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error: 'User name is required' });
    }
    return next();
}

function checkUserInArray (req, res, next){
    const user = users[req.params.index];
    
    if(!user){
        return res.status(400).json({ error: 'User does not exists'});
    }

    req.user = user;

    return next();
}

server.get('/users', (req, res) => { 
    return res.json(users);
})
server.get('/users/:index', checkUserInArray, (req, res) => {  //index é a posição do vetor
    //const { index } = req.params;
    //const { id } = req.params;  // ou const id = req.params.id;
    //const nome = req.query.nome;
    return res.json(req.user);
})

server.post('/users', checkUserExists, (req, res, ) => {
    const { name } = req.body;
    
    users.push(name);

    return res.json(users);
});
//edição de usuário
server.put('/users/:index', checkUserInArray ,checkUserExists, (req, res) => {

    const { index } = req.params;
    const { name } = req.body; 

    users[index] = name;

    return res.json(users);
});
//criar rota de exclusão
server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);
    return res.send();
});

server.listen(3000);