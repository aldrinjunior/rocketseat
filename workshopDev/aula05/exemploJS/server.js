// //function serve para ser um atalho que pode ser executado várias e várias vezes !
//                 //parametros
// function soma(numero1, numero2) {
//     return numero1 + numero2
// } 

// const somar = soma (10,20)

// console.log(soma(5,5))
// console.log(somar)  
const xicara =  {
    cor: "branco",
    tamanho: 10,
    estaSujo(simNao) {
        return simNao
    }
}

console.log(xicara.estaSujo("sim"))
 
const cor= "preto"
const tamanho = 5
function sujo(esta) {
    console.log(esta)
}

const xicara2 = {
    cor,
    tamanho,
    sujo
}  