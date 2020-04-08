const express = require('express')           //serviço do express para carregar o servidor
const server = express ()

const db = require('./db')

server.use(express.static("public"))        //configurar arquivos estáticos (css, scripts, imagens)

//configurar uso do req.body
server.use(express.urlencoded({ extended: true })) //existe agr uma opção extendida 

//config nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {                //colocar os htmls na pasta views
    express: server,                         //fazer os links atrávez da pasta server
    noCache: true,
})
 
//rotas
server.get("/", function(req, res) {         //parametros de requisição e resposta
  
    //consultar dados             
    db.all(`SELECT * FROM ideas`, function(err, rows) {

    if(err) {
        console.log(err)
        return res.send("Erro no banco de dados")
    }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []                       //const é uma var que nao muda, e let é uma que 
        for (let idea of reversedIdeas) {
            //console.log(idea) (aqui mostra todas as ideia)
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea) //push adiciona algo ao vetor
            }
        }    
        //console.log(lastIdeas)        
        return res.render("index.html", { ideas: lastIdeas })
    })
  
})

server.get("/ideas", function(req, res) {    //parametros de requisição e resposta
   
    db.all(`SELECT * FROM ideas`, function(err, rows) {
    
    if (err) {
        console.log(err)
        return res.send("Erro no banco de dados")
    }

    const reversedIdeas = [...rows].reverse()
    return res.render("ideas.html", { ideas: reversedIdeas})

    })
}) 

server.post("/", function (req, res) {
    //console.log(req.body) //req.body não está habilitado por padrão no express

    //inserir dados na tabela 
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
         ) VALUES (?,?,?,?,?); 
    `
                //place holders, que vão ser substituidos pelos values
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
  db.run(query, values, function(err){
    if (err) {
        console.log(err)
        return res.send("Erro no banco de dados")
    }
    //como fazer redirecionamento

    return res.redirect("/ideas")

 })
})

server.listen(4000)                          //rodar server na porta 4000
