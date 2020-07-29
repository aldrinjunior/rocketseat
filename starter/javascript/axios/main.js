//o axios é para retornar os valores de uma forma mais fácil 
//precisa informar o metodo, e depois a url
axios.get('https://api.github.com/users/diego3g') 
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.warn(error);
    })