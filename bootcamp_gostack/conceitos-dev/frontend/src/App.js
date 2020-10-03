import React, { useState } from 'react';

import Header from './Components/Header';

function App() {
  const [projects, setProjects] = useState([
    'Desenvolvimento de App',
    'Frontend Web',
  ]);

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
