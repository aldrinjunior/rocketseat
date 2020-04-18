import express from 'express';
import { helloWorld } from './routes';

const app = express();

app.get('/', helloWorld);

app.listen(3333);

//aqui a tipagem funciona pq a importação do express foi feita aqui
//onde os vs code buscar essas informações ??
//se eu passo o mouse por cima de uma váriavel 