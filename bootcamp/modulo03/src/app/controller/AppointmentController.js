import Appointment from '../models/Appointment';
import { startOfHour, parseISO, isBefore} from 'date-fns';
import User from '../models/User';
import * as Yup from 'yup';

class AppointmentController {
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
        //check for avaliability  
        const checkAvaliability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });
        if(checkAvaliability) {
            return res.status(400).json({ error: 'Appointment date is not avaliable' });
        }

        const appointment = await Appointment.create({
            user_id: req.user_id,
            provider_id,
            date: hourStart,
        });
        return res.json(appointment);
    }
}

export default new AppointmentController;