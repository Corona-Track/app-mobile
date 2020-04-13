import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomePage from '../pages/home';
import SplashPage from '../pages/splash';
import LoginPage from '../pages/login';
import TookPhotoPage from '../pages/createaccount/tookphoto';
import TakePhotoPage from '../pages/createaccount/takephoto';
import PersonalDataPage from '../pages/createaccount/personaldata';
import PersonalAddressPage from '../pages/createaccount/personaladdress';
import AlreadyHadCoronavirusPage from '../pages/createaccount/alreadyhadcoronavirus';
import SomeoneDiagnosedPage from '../pages/createaccount/someonediagnosed';
import SomeoneSuspiciousPage from '../pages/createaccount/someonesuspicious';
import ComorbiditiesPage from '../pages/createaccount/comorbidities';
import MedicinesPage from '../pages/createaccount/medicines';
import FinishUncontaminatedPage from '../pages/createaccount/finishuncontaminated';
import AlreadyHadCoronavirusTestPage from '../pages/createaccount/alreadyhadcoronavirustest';
import TestResultPage from '../pages/createaccount/testresult';

//App internal routes
const ApplicationStackNavigator = createStackNavigator({
    Home: { screen: HomePage }
    //AA: { screen: AAPage },
}, { initialRouteName: "Home" });

//App external routes
const AuthenticationStackNavigator = createStackNavigator(
    {
        TakePhoto: { screen: TakePhotoPage },
        TookPhoto: { screen: TookPhotoPage },
        PersonalData: { screen: PersonalDataPage },
        PersonalAddress: { screen: PersonalAddressPage },
        AlreadyHadCoronavirus: { screen: AlreadyHadCoronavirusPage },
        AlreadyHadCoronavirusTest: { screen: AlreadyHadCoronavirusTestPage },
        TestResult: { screen: TestResultPage },
        SomeoneDiagnosed: { screen: SomeoneDiagnosedPage },
        SomeoneSuspicious: { screen: SomeoneSuspiciousPage },
        Comorbidities: { screen: ComorbiditiesPage },
        // Medicines: { screen: MedicinesPage },
        FinishUncontaminated: { screen: FinishUncontaminatedPage },


        Login: { screen: LoginPage },
        Splash: { screen: SplashPage },
    },
    {
        initialRouteName: 'Login'
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