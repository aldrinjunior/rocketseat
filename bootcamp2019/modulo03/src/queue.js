import 'dotenv/config';

import Queue from './lib/Queue';
//esse arquivo serve para rodar a fila em um servidor separado da aplicação, então precisa abrir um novo terminal
Queue.processQueue();