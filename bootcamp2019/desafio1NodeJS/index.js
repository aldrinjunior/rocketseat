const express = require ('express');
const server = express();
server.use(express.json());
//Query Parms = ?teste=1
//Route Parms = /tasks/1
//Request body = {"title": "projeto React", "tasks": ["tarefa React", "tarefa Nodejs"] }

const projects= [];//criado um array de projects como uma constante

//contador de requisições
server.use((req, res, next) => {
    console.count('a requisição foi chamada');
    return next();
});

function checkProjectExists(req, res, next) { //server para checar se o id existe dentro do array de projetos
    if (!req.body.id) {
    return res.status(400).json({ error: 'Project not found !'});
    }//se existir, continua com a função next
    return next();
};

//buscar todos projetos
server.get('/projects', (req, res) => { 
    return res.json(projects);
});

//buscar um projeto pelo id
server.get('/projects/:id', checkProjectExists, (req, res) => { //os routes params precisa estar dentro da rota também 
    const { id } =req.params; 
    return res.json(projects[id]);
});

//criação de um projeto (falta arrumar as tasks)
server.post('/projects', (req, res) => {
    const { id, title, tasks } = req.body;

    const project = {
        id,
        title,
        tasks 
    };
    projects.push(project); //push serve para ?

    return res.json(projects);
});
//alterar as rotas 
server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id, title, tasks } = req.body;

    const project = {
        id, 
        title,
        tasks
    };
    projects [id] = project;
    return res.json(projects)
});
//apaga por id (check nao funciona)
server.delete('/projects/:id', (req, res) => {
    projects.splice(id, 1);
    return res.send(projects);
});

//criação de uma task dentro do projeto existente (nao funciona adicionar tarefa )
server.post('/projects/:id', checkProjectExists, (req, res) => {
    const { id, title, tasks } = req.body;

    const project = {
        tasks
    };
    projects [tasks] = project.tasks;
    return res.json(projects);
});
server.listen(4000);