import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([
    'Desenvolvimento de App',
    'Frontend Web',
  ]);

  // usar async await ou o then, porque vai demorar um pouco
  useEffect(() => {
    api.get('/projects').then((response) => {
      console.log(response);
    });
  }, []); // se colocar uma variavel dentro de [],
  // ela vai atualizar sempre que ela for alterada

  function handleAddProject() {
    setProjects([...projects, `Novo projeto ${Date.now()}`]);
  }

  return (
    <>
      <Header title='Projects' />

      <ul>
        {projects.map((project) => (
          <li key={project}>{project}</li>
        ))}
      </ul>

      <button type='button' onClick={handleAddProject}>
        Adicionar project
      </button>
    </>
  );
}

export default App;
