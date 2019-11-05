import React from 'react';
import logoOrkut from '../assets/orkut_logo.png';

function Header() {
    return(
        <header>
            <nav>
                <img src={logoOrkut} height="42"/>
                <div>
                    <span>Meu Perfil</span>
                    <i className="material-icons"></i>
                </div>
            </nav>
        </header>
    );
}

export default Header;
