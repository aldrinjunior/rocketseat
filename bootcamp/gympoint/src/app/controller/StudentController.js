import User from '../models/User';
import * as Yup from 'yup';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({ //passar o formato do objeto
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(5),
        });
        //verificar se o req, body esta passando os bgl ali de cima
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'validation fails'});
        }
        //verificar se já nao existe aquele email cadastrado
        const UserExists = await User.findOne ({ where: { email: req.body.email } } );
        if (UserExists) {
            return res.status(400).json({ error: 'User already exists '});
        }
        const {id, name, email, provider} = await User.create(req.body); //req body vem todos os dados lá do user 

        return res.json({
            id, 
            name, 
            email,
            provider,
        });
    }
    async update (req, res) {
        const {email, oldPassword } = req.body;
        //quando cria o usuario, a gente verifica se o email existe
        const user = await User.findByPk(req.userId);
       
        if(email!== user.email){
            const UserExists = await User.findOne ({ where: { email } } );
          
            if (UserExists) {
                return res.status(400).json({ error: 'User already exists '});
            }
        }

        if(oldPassword && !(await user.checkPassword(oldPassword))){ // só fazer a verificação se o usuario inserir a senha antiga
            return res.status(401).json({error: 'Password does not match' });
        }   

        const { id, name, provider } = await user.update(req.body);
        return res.json({ 
            id,
            name,
            email,
            provider,
         });
    }
}

export default new StudentController;