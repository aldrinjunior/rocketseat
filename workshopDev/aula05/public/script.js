function onOff() {  
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document 
        .querySelector("body")
        .classList
        .toggle("hideScroll") //esconder o scroll 

    document    
        .querySelector("#modal")
        .classList
        .toggle("addScroll")    //voltar a mostrar
}

function checkFields (event) {

    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]   
    //! exclamação serve de negação
    // console.log(!event.target["title"].value.trim())
    //console.log(typeof event.target["title"].value === "string")
                                    
    const isEmpty = valuesToCheck.find(function(value) { //pra cada valor ele vai executar uma função
       
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfIsString && checkIfIsEmpty) {
            return true //eu achei um cara vazio
        }
    })

    if(isEmpty) {   //não deixe que faça o evento padrão(nao vai evniar o formulario)
        event.preventDefault()
        alert("Por favor, preencha todos os campos")
    }
}