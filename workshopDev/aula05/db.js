const sqlite3 = require ('sqlite3').verbose() //verbose server pra comunicar o sqlite3
                      //função database       
const db = new sqlite3.Database('./aula05.db')
         //new cria objetos javascript

    db.serialize(function () {

    db.run(`
        CREATE TABLE IF NOT EXISTS ideas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT 
        );
    `)
    //inserir dados
//     const query = `
//         INSERT INTO ideas(
//             image,
//             title,
//             category,
//             description,
//             link
//         ) VALUES (?,?,?,?,?);
//     `

//     const values = [
//             "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//             "Cursos de programação",
//             "Estudo",
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, et alias. Rerum, quis dolorem.",
//             "https://rocketseat.com.br"
//     ]
//   db.run(query, values, function(err){
//     if (err) return console.log(err)

//          console.log(this)

//  })

//     //DELETAR um dado da tabela
//     db.run(`DELETE FROM ideas WHERE id = ?`, [2], function(err) {
//         if (err) return console.log(err)

//         console.log("DELETEI", this)
//     })

    //consultar dados 
//     db.all(`SELECT * FROM ideas`, function(err, rows) {
//         if (err) return console.log(err)

//         console.log(rows)
//     })

})

//como usar o db nessa aplicação?
//exportar db para geral 
module.exports = db