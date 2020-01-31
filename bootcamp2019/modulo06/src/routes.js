import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTittleVisible: false, //esquema do botão de voltar, deixar desabilitado pq assim fica só um ícone
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
      },
    },
  ),
);
export default Routes;
