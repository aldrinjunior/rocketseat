import User from '../models/User';
import Notification from '../schemas/Notification';
//essa rota de notificações só pode ser acessada por prestadores de serviço
class NotificationController {
    async index(req, res) {
        const CheckIsProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });
        if (!CheckIsProvider) {
            return res.status(401).json({ error: 'Only providers can load notifications' });
        }
        //listar as notificações (eles são diferentes do sequelize, pq aqui usa o mongoose) 
        const notifications = await Notification.find({
            user: req.userId, //o usuario logado
        })//concatenar metodos
        .sort({ createdAt: 'desc'})
        .limit(20); 

        return res.json(notifications);
    }

    async update(req, res) {
        // const notification = await Notification.findById(req.params.id);
        //o mongoose tem um metodo que consegue encontrar um registro e atualizar ele ao mesmo tempo
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true },
        );

        return res.json(notification);
    }
}
export default new NotificationController();