import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './Components/SplashScreen';
import ChooseLanguage from './Components/ChooseLanguage';
import Login from './Components/Login';
import HomeRoutes from './Components/HomeRoutes';
import MenuRoutes from './Components/MenuRoutes';
import Register from './Components/Register';

const Routes = createStackNavigator(
   {
      SplashScreen: {
         screen: SplashScreen,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      ChooseLanguage: {
         screen: ChooseLanguage,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      Login: {
         screen: Login,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      Register: {
         screen: Register,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      HomeRoutes: {
         screen: HomeRoutes,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      MenuRoutes: {
         screen: MenuRoutes,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
   },
   {
      initialRouteName: "SplashScreen"
   }
);

const AppContainer = createAppContainer(Routes);

export default AppContainer;