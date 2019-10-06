const User = require('../models/User');
module.exports = {
  async store(req, res) {     //assync pq pode demorar um pouco para salvar no banco 
        const { email }= req.body;

        let user = await User.findOne({ email });

        if (!user){
            user = await User.create({ email });
        }

        //const user = await User.create({ email });

        return res.json(user);
    }
};
//index - vai retornar uma listagem de seções
// show - quando quer retornar uma unica seção
// store - criar uma seção
// update - alterar
// destroy - deletar