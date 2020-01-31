import multer from 'multer';
import crypto from 'crypto'; 
import { extname, resolve } from 'path'; //extname retorna a extenção, e o resolve percorre o caminho
//export obj de config
export default {   //como o multer vai guardar o storage
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp','uploads'),
        filename: (req, file, cb) => {
//como a gente vai formatar o nome da img, mas não da pra ter repetidos
            crypto.randomBytes(16, (err, res) => {
                if (err) return cb(err)
                                //transforma 16 bytes em hexadecimal
                return cb(null, res.toString('hex') + extname(file.originalname));
                                                      //vai manter a extensão original do arquivo 
            });
        },
    }),         
};