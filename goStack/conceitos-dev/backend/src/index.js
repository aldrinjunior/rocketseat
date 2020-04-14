const express = require('express');

const app = express();
//o usuário requisitou a pagina
app.get('/projects', (request, response) => {
    return response.json({message: 'Hello world'});
});

app.listen(5000, () => {
    console.log('😈 Back-end started');
});