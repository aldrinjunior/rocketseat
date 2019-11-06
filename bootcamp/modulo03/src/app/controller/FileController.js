import File from '../models/File';

class FileController {
    async store (req, res) {
                //nome do bgl : como vai ficar no banco
        const { originalname: name, filename: path } = req.file;

        const file = await File.create({
            name, 
            path,
        });

        return res.json(file);

    }
}

export default new FileController();