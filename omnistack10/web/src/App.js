import React from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
//Componente = é uma função isolada de (html, css, js) que retorna algum conteúdo sem interferir no restante da aplicação
//Propriedade = informações que um componente pai passa para um componente filho
//Estado = informação mantida pelo componente (imutabilidade, nunca altera, vamos criar um novo a partir do anterior)
function App() {
  return (
    <div id="app">
        <aside>
        <strong>Cadastrar</strong>
        <form>
          <div class="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input name="github_username" id="github_username" required />
          </div>
          <div class="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required />
          </div>
          <div className="input-group">
            <div class="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input name="latitude" id="latitude" required/>
          </div>
          <div class="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input name="longitude" id="longitude" required/>
          </div>
        </div>
        <button type="submit">Salvar</button>
           </form>
          </aside>
        <main>
          <ul>
            <li className="dev-item">
              <header>
                <img src="https://avatars2.githubusercontent.com/u/38501933?s=460&v=4" alt="Aldrin Junior"/> 
                   <div className="user-infor">
                    <strong>Aldrin Junior</strong>
                    <span>ReactJS, React Native, Node JS</span>
                  </div> 
              </header>
              <p>Information Technology Student @Ulbra</p>
              <a href="http://github.com/aldrinjunior">Acessar perfil do github</a>
            </li>
          </ul>
          <ul>
            <li className="dev-item">
              <header>
                <img src="https://avatars2.githubusercontent.com/u/38501933?s=460&v=4" alt="Aldrin Junior"/> 
                   <div className="user-infor">
                    <strong>Aldrin Junior</strong>
                    <span>ReactJS, React Native, Node JS</span>
                  </div> 
              </header>
              <p>Information Technology Student @Ulbra</p>
              <a href="http://github.com/aldrinjunior">Acessar perfil do github</a>
            </li>
          </ul>
          <ul>
            <li className="dev-item">
              <header>
                <img src="https://avatars2.githubusercontent.com/u/38501933?s=460&v=4" alt="Aldrin Junior"/> 
                   <div className="user-infor">
                    <strong>Aldrin Junior</strong>
                    <span>ReactJS, React Native, Node JS</span>
                  </div> 
              </header>
              <p>Information Technology Student @Ulbra</p>
              <a href="http://github.com/aldrinjunior">Acessar perfil do github</a>
            </li>
          </ul>
          <ul>
            <li className="dev-item">
              <header>
                <img src="https://avatars2.githubusercontent.com/u/38501933?s=460&v=4" alt="Aldrin Junior"/> 
                   <div className="user-infor">
                    <strong>Aldrin Junior</strong>
                    <span>ReactJS, React Native, Node JS</span>
                  </div> 
              </header>
              <p>Information Technology Student @Ulbra</p>
              <a href="http://github.com/aldrinjunior">Acessar perfil do github</a>
            </li>
          </ul>
        </main>
    </div>
  );
}

export default App;
