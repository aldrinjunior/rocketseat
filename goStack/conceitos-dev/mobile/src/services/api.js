import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export default api;

/**
 * iOs com emulador : localhost
 * ios com dispositvo: ip adress da maquina
 * Android com emulador: localhost precisa abrir o comando adb 
 * adb reverse 
 * Android fisico : IP da maquina
 */