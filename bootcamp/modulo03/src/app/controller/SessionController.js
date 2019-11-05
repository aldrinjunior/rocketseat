import jwt from 'jsonwebtoken';
import * as Yup from 'Yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store (req, res) {
        const schema = Yup.object().shape({ //passar o formato do objeto
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });
        //verificar se o req, body esta passando os bgl ali de cima
        
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if(!user) {
            return res.status(401).json({ error: 'user not found' });
        }
        
        if(!(await user.checkPassword(password))) {
            return res.json(401).json({ error: 'password does not match '});
        }
        const { id, name } = user; {
            
            return res.json({
                user: {
                id, 
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret,{
                expiresIn: authConfig.expiresIn,
            }),
        });
        }
    }
}

export default new SessionController;