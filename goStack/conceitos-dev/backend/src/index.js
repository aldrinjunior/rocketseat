const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4'); //cria um id unico universal

const app = express();

app.use(cors());

app.use(express.json());

const projects = [];

function logRequests(request, response, next) {
    const {method, url} = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);
  
    return next(); //chamada do proximo middleware
}

function validateProjectId(request, response, next) {
    //isUuid verifica se o id foi válido
    const {id} = request.params;

    if(!isUuid(id)) { //se passar um return rentro do middleware ele encerra a aplicação
        return response.status(400).json({ error: 'Invalid project ID. '});
    }

    return next();
}

app.use(logRequests);
//forma para passsar middleware para todas as rotas que tiverem essa estrutura
app.use('/projects:id', validateProjectId);

app.get('/projects', (request, response) => {
    const {title} = request.query;

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const {title, owner} = request.body;

    const project = {id: uuid(), title, owner};

    projects.push(project);
    
    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const {id} = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);
    
    if(projectIndex <0)  {
        return response.status(400).json({ error: 'Project not found.'})
     }

     const project = {
        id,
        title,
        owner,
     };

     projects[projectIndex] = project;

    return response.json(project);

});

app.delete('/projects/:id', (request, response) => {
    const {id} = request.params;
    
    const projectIndex = projects.findIndex(project => project.id === id);
    
    if(projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found. '})
    }
                    //indice, e quantas inf
    projects.splice(projectIndex, 1);

    return response.status(204).send();
    
});

app.listen(5000, () => {
    console.log('😈 Back-end started');
});