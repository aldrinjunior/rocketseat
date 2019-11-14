import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

//importar o Container dos styles para poder ativar o styled components
//escrever em formato de class para usar estado
export default class Main extends Component {
  static navigationOptions = {
    title: 'Usuários',
  };
  //Não se valida propTypes do que se precisa, então aqui só vai chamar essas duas
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };
  //precisa do await pra ver se a informação esta no async storage
  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({users: JSON.parse(users)});
    }
  }

  async componentDidUpdate(_, prevState) {
    const {users} = this.state;

    if (prevState.users !== users) {
      //salvar em json pq nao suporta vetores
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {};

  handleNavigate = user => {
    const {navigation} = this.props;

    navigation.navigate('User', {user});
  };

  handleAddUser = async () => {
    const {users, newUser} = this.state;

    this.setState({loading: true});

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  };

  render() {
    const {users, newUser, loading} = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({newUser: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtrator={user => user.login}
          renderItem={({item}) => (
            <User>
              <Avatar source={{uri: item.avatar}} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver Perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
//quando precisa passar um parametro, tem que passar uma arrow function
//usar onPress pra quando for adicionar um click de usuario em um submit
//{ } uma chave indica que esta passando um cod javascript dentro da funcao, e a {{ indica que esta passando uma funcao ali dentro }}
//precisa dar um command r para atualizar
