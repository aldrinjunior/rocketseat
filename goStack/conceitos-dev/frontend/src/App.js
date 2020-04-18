import React, {useState, useEffect} from 'react';
import api from './services/api';

import './App.css'

import Header from './components/Header';

function App() {                    //inicializar com array pq a informação que ele vai receber é do mesmo tipo
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        //var dentro da função
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, [])
    //array de dependecia
    async function handleAddProject() {
        // setProjects([... projects, `Novo projeto ${Date.now()}`]);
        //uma aplicação pode ter quantos estados vc quiser 
        const response = await api.post('projects', {
                title: `Web end com React JS ${Date.now()}`,
                owner: "Diego Fernandes"
            });
            
            const project = response.data;

            setProjects([...projects, project]);
    
        }

    return (
        <>
            <Header title="Projects" />
            <ul>    
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>
            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}
export default App;