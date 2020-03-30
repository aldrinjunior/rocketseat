const express = require('express') //serviço do express para carregar o servidor
const server = express ()

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//criar uma rota /
//capturar o pedido do cliente para responder (ex: formulario)

server.get("/", function(req, res) { //parametros de requisição e resposta
    return res.sendFile(__dirname + "/index.html")
})

server.get("/ideas", function(req, res) { //parametros de requisição e resposta
    return res.sendFile(__dirname + "/ideas.html")
})

server.listen(4000) //rodar

 