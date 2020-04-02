const express = require('express')           //serviço do express para carregar o servidor
const server = express ()

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, et alias. Rerum, quis dolorem.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercicio",
        category: "Saude",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, et alias. Rerum, quis dolorem.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, et alias. Rerum, quis dolorem.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaoke",
        category: "Diversão em familia",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, et alias. Rerum, quis dolorem.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729018.svg",
        title: "YouTube",
        category: "Diversão em familia",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, et alias. Rerum, quis dolorem.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title: "Pintura",
        category: "Arte",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, et alias. Rerum, quis dolorem.",
        url: "https://rocketseat.com.br"
    },
]

server.use(express.static("public"))        //configurar arquivos estáticos (css, scripts, imagens)

//config nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {                //colocar os htmls na pasta views
    express: server,                         //fazer os links atrávez da pasta server
    noCache: true,
})
 
//rotas
server.get("/", function(req, res) {         //parametros de requisição e resposta
  
    const reversedIdeas = [...ideas].reverse()

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

server.get("/ideas", function(req, res) {    //parametros de requisição e resposta
    const reversedIdeas = [...ideas].reverse()
    return res.render("ideas.html", { ideas: reversedIdeas})
}) 

server.listen(4000)                          //rodar server na porta 4000
