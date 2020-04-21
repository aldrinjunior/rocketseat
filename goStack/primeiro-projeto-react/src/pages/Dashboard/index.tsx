import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';
//function Dashboard() {}

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="">
          <img
            src="https://avatars2.githubusercontent.com/u/38501933?s=460&u=c37d8f46992a314dd8ca5ee6c6f7f435bdca7f2d&v=4"
            alt="Aldrin Junior"
          />
          <div>
            <strong>rocketseat unform</strong>
            <p>Easy peasy scalable ReactJS & React Native forms!</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="">
          <img
            src="https://avatars2.githubusercontent.com/u/38501933?s=460&u=c37d8f46992a314dd8ca5ee6c6f7f435bdca7f2d&v=4"
            alt="Aldrin Junior"
          />
          <div>
            <strong>rocketseat unform</strong>
            <p>Easy peasy scalable ReactJS & React Native forms!</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="">
          <img
            src="https://avatars2.githubusercontent.com/u/38501933?s=460&u=c37d8f46992a314dd8ca5ee6c6f7f435bdca7f2d&v=4"
            alt="Aldrin Junior"
          />
          <div>
            <strong>rocketseat unform</strong>
            <p>Easy peasy scalable ReactJS & React Native forms!</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
