import User from '../models/User';
import Students from '../models/Students';

class StudentController {
    async store(req, res) {
        //verificar se já nao existe aquele email cadastrado
        const StudentExists = await Student.findOne ({ where: { email: req.body.email } } );
        if (StudentExists) {
            return res.status(400).json({ error: 'Student already exists '});
        }
        const {name, email, age, widh, weight} = await Students.create(req.body); //req body vem todos os dados lá do Students 

        return res.json({

            name, 
            email,

        });
    }
    async update (req, res) {
        return res.json({ ok: true });
    }
}

export default new StudentController;