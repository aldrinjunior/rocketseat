import { startOfDay, endOfDay, setHours, setMinutes, setSeconds, format, isAfter } from 'date-fns';
import Appointment from '../models/Appointment';
import { Op } from 'sequelize';

//controler que vai mostrar os horarios disponives para o usuario
class AvailableController {
    async index (req, res) {
        const { date } = req.query;

        if(!date) {
            return res.status(400).json({ error: 'invalid date' });
        }

        //2019-11-10 17:59:33

        const searchDate = Number(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.params.providerId,
                canceled_at: null,
                date: {
                    [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
                },
            },
        });
        //horarios disponiveis para mostrar no frontend (pode ser feito uma logica estruturada ao inves de digitar todos horarios)
        const schedule = [
            '08:00',         //2019-11-10 08:00:00
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
        ]; 
                          //percorrer os horarios com map, e jogar na var mtime
        const available = schedule.map(time => {
            const [hour, minute] = time.split(':');
            const value = setSeconds(setMinutes(setHours(searchDate, hour), minute), 0);

            return {
                time, 
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"), //aqui serve para retornar todos horarios disponiveis em tela
                available: isAfter(value, new Date()) &&
                !appointments.find(a => format(a.date, 'HH:mm') === time), //isAfter vai dizer se o horário é depois de agora
            }; 
        });

        return res.json(available);
    }   
}

export default new AvailableController();