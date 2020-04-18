import { Request, Response } from 'express';
import createUser from './services/CreateUser'
export function helloWorld (request: Request, response: Response) {
        const user = createUser({
        email: 'aldrinjr',
        password: '12345',
        techs: [
            'NodeJS', 
            'React' , 
            'Native', 
            {title: 'Javasipt', experience: 100 },
        ],
    });
        
        console.log(user.email);

    return response.json({ message: 'Hello world'});
}

 //fazer desestruturação, para receber os valores com a tipagem