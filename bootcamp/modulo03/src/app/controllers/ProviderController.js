import User from '../models/User';

class ProviderController {
    async index (req, res) {
        const provider = await User.findAll({
            where: { provider: true },
        });
        return res.json(providers);
    }
}

export default new ProviderController;