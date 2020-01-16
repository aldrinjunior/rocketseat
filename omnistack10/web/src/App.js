import React from 'react';

//Componente = é uma função isolada de (html, css, js) que retorna algum conteúdo sem interferir no restante da aplicação
//Propriedade = informações que um componente pai passa para um componente filho
//Estado = 

function App() {
  const counter= 0;
  function incrementCounter() {
    alert('Hello');
  }

  return (
  <>  
    <h1>Contador: {counter}</h1>
    <button onClick={incrementCounter}>Incrementar</button>
  </>
  );
}

export default App;
