const express = require ('express');
const server = express();
server.use(express.json());
//Query Parms = ?teste=1
//Route Parms = /tasks/1
//Request body = {"title": "projeto React", "tasks": ["tarefa React", "tarefa Nodejs"] }

const projects= [];//criado um array de projects como uma constante

//buscar todos projetos
server.get('/projects', (req, res) => { 
    return res.json(projects);
});

//buscar um projeto pelo id
server.get('/projects/:id', (req, res) => { //os routes params precisa estar dentro da rota também 
    const { id } =req.params; 
    return res.json(projects[id]);
});

//criação de um projeto (falta arrumar as tasks)
server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    };

    projects.push(project); //push serve para ?

    return res.json(projects);
});
//alterar as rotas 
server.put('/projects/:id', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id, 
        title,
        tasks: []
    };

    projects [id] = project;
    return res.json(projects)
});
//apaga por id 
server.delete('/projects/:id', (req, res) => {
    const {id} = req.params;

    projects.splice(id, 1);

    return res.json(projects);
})

server.listen(4000);