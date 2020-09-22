const express = require("express");
const { v4: uuidv4 } = require("uuid");
const isuuid = require("isuuid");

const app = express();

app.use(express.json());

const projects = [];

// middleware
function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  // precisa ser chamada a função next, se não nem vai chamar a proxima função
  return next();
  // o node é completamente linear
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isuuid(id)) {
    return response.status(400).json({ error: "Invalid project ID." });
  }

  return next();
}
//app.use(logRequests);
app.use("/projects/:id", validateProjectId);

app.get("/projects", logRequests, (request, response) => {
  console.log("3");
  const { title } = request.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title)) //? o titulo foi preenchido => para cada um dos projetos, verificar se tem o titulo digitado na query
    : projects; // e se for vazio, retorna tudo

  return response.json(results);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuidv4(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found. " });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("Back-end started 🚀");
});
