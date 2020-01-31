//arquivo para enviar as notificaçoes de agendamento para o prestador de serviços
import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true, 
    },
    user: {
        type: Number,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    {
    timestamps: true,
    }
);
//configurar esse codigo lá no appointment controller
export default mongoose.model('Notification', NotificationSchema);