//JS Assincrono (chama e espera a resposta)

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.github.com/users/diego3g');
xhr.send(null);

//serve para mandar um obtejo (a função da api como um objeto)
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 ) {
        console.log(JSON.parse(xhr.responseText));
    }
}



