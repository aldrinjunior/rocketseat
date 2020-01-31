import User from '../models/User';
import File from '../models/File';

class ProviderController {
    async index(req, res) {
        const providers = await User.findAll({
            where: { provider : true },
            attributes: ['id', 'name', 'email', 'avatar_id' ],
            include: [{
                model: File, //modificar o static associate para mostrar todo o nome do arquivo
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
            }],
        });

        return res.json(providers);
    }
}

export default new ProviderController();