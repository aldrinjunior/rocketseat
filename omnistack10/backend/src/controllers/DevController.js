const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//métodos controller = index(lista), show(unico), store(criar), update, destroy

module.exports = {
async index(req, res) {
    const devs = await Dev.find();

        return res.json(devs);
},

async store (req, res) {
    const {github_username, techs, latitude, longitude} = req.body;

    let dev = await Dev.findOne({ github_username }); //para buscar um dev na base de dados
    
    if(!dev) { //se o dev não existir, então criar um novo dev 
    const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);

    const {name = login, avatar_url, bio } = apiRes.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
    };

    const dev = await Dev.create({ //para salvar no mongo
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
    });

    }
    return res.json(dev);
    }
};  