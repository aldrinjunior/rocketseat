import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
//tudo no react é um componente
//react dom pode chamar mais de uma rota ao mesmo tempo
//switch serve pra apenas uma pagina ser exibida a cada momento

import Main from './pages/Main';
import Repository from './pages/Repository';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path = '/repository'component = {Repository} />
            </Switch>
        </BrowserRouter>
    );
}