import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomePage from '../pages/home';
import SplashPage from '../pages/splash';
import LoginPage from '../pages/login';
import TookPhotoPage from '../pages/createaccount/tookphoto';
import TakePhotoPage from '../pages/createaccount/takephoto';
import PersonalDataPage from '../pages/createaccount/personaldata';
import PersonalAddressPage from '../pages/createaccount/personaladdress';
import AlreadyHadFluVaccinePage from '../pages/preventive-analysis/already-had-flu-vaccine';
import WeekLeaveHomeTimesPage from '../pages/preventive-analysis/week-leave-home-times';
import SocialDistancePage from '../pages/preventive-analysis/social-distance';
import ProtectionUsagePage from '../pages/preventive-analysis/protection-usage';
import TouchingPrecautionPage from '../pages/preventive-analysis/touching-precaution';
import HomePrecautionsPage from '../pages/preventive-analysis/home-precautions';
import OutsideWorkPage from '../pages/preventive-analysis/outside-work';
import RelativesLeavingHomePage from '../pages/preventive-analysis/relatives-leaving-home';
import RelativesHomePrecautionsPage from '../pages/preventive-analysis/relatives-home-precautions';

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
        Login: { screen: LoginPage },
        Splash: { screen: SplashPage },
        AlreadyHadFluVaccine: { screen: AlreadyHadFluVaccinePage },
        WeekLeaveHomeTimes: { screen: WeekLeaveHomeTimesPage },
        SocialDistance: { screen: SocialDistancePage },
        ProtectionUsage: { screen: ProtectionUsagePage },
        TouchingPrecaution: { screen: TouchingPrecautionPage },
        HomePrecautions: { screen: HomePrecautionsPage },
        OutsideWork: { screen: OutsideWorkPage },
        RelativesLeavingHome: { screen: RelativesLeavingHomePage },
        RelativesHomePrecautions: { screen: RelativesHomePrecautionsPage }
    },
    {
        mode: "modal",
        initialRouteName: 'AlreadyHadFluVaccine'
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