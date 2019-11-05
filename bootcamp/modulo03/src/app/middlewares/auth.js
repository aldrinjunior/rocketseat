import jwt from 'jsonwebtoken';
import { promisify } from 'util'; //convert callback em assync await
 
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) { //se nao tiver presente o auth header
     return res.status(401).json ({ error: 'token not provided '});
    }

    const [ , token] = authHeader.split(' ');
    //como essa verificação pode dar erro, vamos configurar o try catch
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        
        req.userId = decoded.id;

        return next();
        } catch (err) {
            return res.status(401).json({error: 'token invalid '});
    }
};
