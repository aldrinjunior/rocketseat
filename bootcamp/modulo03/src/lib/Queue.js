import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];
//criar tambem uma pasta jobs dentro de src/app para armazenar todos os serviços
class Queue { //cada serviço vai ter uma fila separada, ex: fila de cancelamento
    constructor() {
        this.queues = {}; //pegando todos jobs e armazenando aqui dentro 

        this.init();
    }
    //para cada job, cria uma fila
    init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
            bee: new Bee(key, { 
                redis: redisConfig, //passar a configuração com o redis, precisa criar o redis.js na pasta config
            }),
            handle,//handle é o metodo que vai procesar o job e enviar o email
            };
        });
    }
    //agora precisa de um metodo para armazenar o job
    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
    }
    //vai pegar cada um desse job, e processar no background
    processQueue(){
        jobs.forEach(job =>{
            const { bee, handle } = this.queues[job.key];

            bee.process(handle);
        });
    }
}

export default new Queue();