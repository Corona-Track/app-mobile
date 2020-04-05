import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomePage from '../pages/home';
import SplashPage from '../pages/splash';
import LoginPage from '../pages/login';
import CreateAccountPage from '../pages/createAccount';
import TookPhotoPage from '../pages/tookphoto';

//App internal routes
const ApplicationStackNavigator = createStackNavigator({
    Home: { screen: HomePage }
    //AA: { screen: AAPage },
}, { initialRouteName: "Home" });

//App external routes
const AuthenticationStackNavigator = createStackNavigator(
    {
        CreateAccount: { screen: CreateAccountPage },
        TookPhoto: { screen: TookPhotoPage },
        Login: { screen: LoginPage },
        Splash: { screen: SplashPage }
    },
    {
        mode: "modal",
        initialRouteName: 'CreateAccount'
    }
);

const RoutesSwitchNavigator = createSwitchNavigator(
    {
        Application: ApplicationStackNavigator,
        Authentication: AuthenticationStackNavigator
    },
    { initialRouteName: 'Authentication' }
);
export default RoutesSwitchNavigator;