import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
    get key() { //se o usuario importar esse arquivo, ele acessa essa propriedade com key
        return 'CancellationMail'; //para cada job, precisa de uma chave unica
    } 
    //metodo handle vai ser chamado para o envio de cada email
    async handle({ data }) {
        const { appointment } = data;

        console.log('A fila executou');

        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subjec: 'Agendamento cancelado',
            template: 'cancellation', 
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date:  format(
                    parseISO(appointment.date),
                    "'dia' dd 'de' MMMM', às' H:mm'h'",
                    {locale: pt}
                ),
            },
        });
    }

}

export default new CancellationMail();