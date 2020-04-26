import React from 'react';
import { Image } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

import logoImg from '../../assets/logo.png';

const signIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>

      <Input name="email" icon="mail" placeholder="E-Mail" />

      <Input name="senha" icon="lock" placeholder="Senha" />

      <Button
        onPress={() => {
          console.log('Deu');
        }}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default signIn;
