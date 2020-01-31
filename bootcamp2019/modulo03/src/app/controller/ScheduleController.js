import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';
//controle de agenda, para mostrar os agendamentos do dia para o administrador 
class ScheduleController {
    async index (req, res) {
        const checkUserProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });
        //se o usuario logado nao tive o provider como true, ele vai dar esse erro
        if(! checkUserProvider) {
            return res.status(401).json({ error: 'User is not a provider' });
        }

        const { date } = req.query;
        const parsedDate = parseISO(date);
        /*
        mostrar agendamento entre
        2019-11-08 00:00:00
        2019-11-08 23:59:59
        */

        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: { //criar um array para informar se os valores estão dentro dos parametros do dia
                    [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
                },
            },
            //listar esses agendamentos por data
            order : ['date']
        });
        //retornar eles para o insominia
        return res.json({ appointments });
    }
}

export default new ScheduleController();