import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours} from 'date-fns';
import pt from 'date-fns/locale/pt';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
    async index(req, res) { 
        const { page = 1 } = req.query;

        const appointments = await Appointment.findAll({
            where: { user_id: req.userId , canceled_at: null},
            order: ['date'],
            attributes: ['id', 'date', 'past', 'cancelable'], //past para verificar se o agendamento já passou ou não
            limit: 20,
            offset: (page -1) * 20, // para listar apenas 20 itens por pagina
            include: [
                {   //fazer isso para incluir os dados do provider na consulta 
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                },
            ],
        });

        return res.json(appointments);
    }
    async store(req, res){
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        })
        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        }

        const { provider_id, date } = req.body;

        /*
        Check if provider_id is a provider (true)
        */
        const CheckIsProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        });

        if(!CheckIsProvider) {
            return res.status(401).json({ error: 'You can only create appointments with providers' });
        }   
        //check for past dates
                                    //parseIso converte aquela zueira do insominia em formato date do javascript
        const hourStart = startOfHour(parseISO(date));
                          //startOfHour serve para pegar apenas a hora, sem os minutos
        if(isBefore(hourStart, new Date())) { //isBefore serve para ver se já não passou a data que vc quer agendar
            return res.status(400).json({ error: 'Past dates are not permited'});
        }       
        //check for Available  
        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });
        if(checkAvailability) {
            return res.status(400).json({ error: 'Appointment date is not availiable' });
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date: hourStart,
        });
        /*
        Notify appointment provider
        */
        const user = await User.findByPk(req.userId);
        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            {locale: pt}
            //dia 22 de junho às 8:40h, mas precisa importar a classe pt from date fns para converter o nome do mes
            //aspas simples dentro das duplas, pq as simples nao serão formatadas
        );

        await Notification.create({
           content: `Novo agendamento de ${user.name} para ${formattedDate}`,
           user: provider_id,
        });

        return res.json(appointment);
    }
    async delete (req, res) { //buscar dados do appointment 
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['name', 'email'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                },
            ],
        });
        if(appointment.user_id !== req.userId) { //verificar se o id desse usuario é o dono do agendamento 

            return res.status(401).json({ 
                error: "You don't have permission to cancel this appointment. ",
        });
        }
        
        const dateWithSub = subHours(appointment.date, 2); //só pode cancelar se for duas horas antes
        //13:00 (diminuiu duas horas do agendamento)
        //dateWithSub == 11h
        //now: 11:25, então nao vai cancelar 
        if(isBefore (dateWithSub, new Date())) { //e aqui vai dar error se falta menos duas horas para cancelar
            return res.status(401).json({
                error: 'You can only cancel appointments 2 hours in advance. ',
            });
        }
        //salvar data de cancelamento no banco de dados 
        appointment.canceled_at = new Date();

        await appointment.save();

        await Queue.add(CancellationMail.key, { //referenciar a key criada em Queue.js
            appointment,
        });

        return res.json(appointment);
    }
}

export default new AppointmentController;