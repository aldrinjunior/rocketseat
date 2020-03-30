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