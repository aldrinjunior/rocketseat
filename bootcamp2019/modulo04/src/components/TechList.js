import React, { Component } from 'react';
import TechItem from './TechItem';

//todo componente escrito em forma de classe precisa do render 
//criar em formato de classe 
//as funções para manipular o estado precisam estar no mesmo arquivo 
class TechList extends Component {
    state = {
        newTech: '',
        techs: []
    };
    //executado assim que o componente aparece em tela
    componentDidMount() {
       const techs = localStorage.getItem('techs');

       if (techs) {
           this.setState({ techs: JSON.parse(techs) });
       }    
    }
    //executado sempre que houver alterações nas props ou estado
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state.techs){
            localStorage.setItem('techs', JSON.stringify(this.state.techs))
        }
        //this.props, this.state
    }
    //executado quando o compenente deixa de existir
    componentWillUnmount(){
//limpar sujeira do componente tipo javascript listener
    }
    //metodo com cosongole log no valor do input
    //variavel de estado é imutavel, e precisa de setState pra alterar os valores 
    handleInputChange = e => {
        //console.log(e.target.value); 
        this.setState({ newTech: e.target.value });
    }
    //o motivo de usar arrow funcion é que as funçoes do componentes precisam ter acesso ao this, então toda vez que atualizar 
    //o estado vai mudar o render tambem (em tempo real)    
    handleSubmit = e => { //serve para salvar o que o usuário digitar 
        e.preventDefault();
        //console.log(this.state.newTech);
        this.setState({ techs: [...this.state.techs, this.state.newTech],
        newTech: ''
        });

        
        //nao pode fazer alteraçoes no array e nos objetos, tem que criar ele do zero
    }

    handleDelete = (tech) => {
        this.setState({ techs: this.state.techs.filter(t => t !== tech)}) //só vai retornar as tecnlogias que forem diferentes do tech clicado
    }

    render() {
        //console.log(this.state);
        //pode usar div, mas é melhor usar a tag <> fragment
        return (
            <form onSubmit={this.handleSubmit}>
            <ul> 
                {this.state.techs.map( tech => (
                <TechItem 
                key={tech} 
                tech={tech} 
                onDelete={() => this.handleDelete(tech)} 
                />
            ))}   
            </ul>
            <input 
                type="text" 
                onChange={this.handleInputChange} 
                value={this.state.newTech}
                />
                <button type="submit">Enviar</button>
            </form>
            //onChange é conforme o usuário vai mudando 
            // <ul>
            //     <li>Node.js</li>
            //     <li>ReactJS</li>
            //     <li>React Native</li>
            // </ul>
        );
    }
}



export default TechList;