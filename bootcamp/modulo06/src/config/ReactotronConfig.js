import Reactotron from 'reactotron-react-native';
//variavel global para return true quando o usuario estiver em ambiente de desenvolvimento
if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
