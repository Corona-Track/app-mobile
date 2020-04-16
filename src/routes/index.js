import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import DisclaimerPage from '../pages/disclaimer';

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
import FinishUncontaminatedPage from '../pages/createaccount/finishuncontaminated';
import AlreadyHadCoronavirusTestPage from '../pages/createaccount/alreadyhadcoronavirustest';
import TestResultPage from '../pages/createaccount/testresult';
import FinishContaminatedPage from '../pages/createaccount/finishcontaminated';

import MedicinesPage from '../pages/preventiveanalysis/medicines';
import AlreadyHadFluVaccinePage from '../pages/preventiveanalysis/alreadyhadfluvaccine';
import WeekLeaveHomeTimesPage from '../pages/preventiveanalysis/weekleavehometimes';
import SocialDistancePage from '../pages/preventiveanalysis/socialdistance';
import ProtectionUsagePage from '../pages/preventiveanalysis/protectionusage';
import TouchingPrecautionPage from '../pages/preventiveanalysis/touchingprecaution';
import HomePrecautionsPage from '../pages/preventiveanalysis/homeprecautions';
import OutsideWorkPage from '../pages/preventiveanalysis/outsidework';
import RelativesLeavingHomePage from '../pages/preventiveanalysis/relativesleavinghome';
import RelativesHomePrecautionsPage from '../pages/preventiveanalysis/relativeshomeprecautions';
import FinishRemainingPage from '../pages/preventiveanalysis/finishremaining';
import FinishCompletePage from '../pages/preventiveanalysis/finishcomplete';

//App internal routes
const ApplicationStackNavigator = createStackNavigator({
    Home: { screen: HomePage }
    //AA: { screen: AAPage },
}, { initialRouteName: "Home" });

//App external routes
const AuthenticationStackNavigator = createStackNavigator(
    {
        //Create Account
        Disclaimer: { screen: DisclaimerPage },
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
        FinishUncontaminated: { screen: FinishUncontaminatedPage },
        FinishContaminated: { screen: FinishContaminatedPage },

        Login: { screen: LoginPage },
        Splash: { screen: SplashPage },

        //Preventive Profile
        Medicines: { screen: MedicinesPage },
        AlreadyHadFluVaccine: { screen: AlreadyHadFluVaccinePage },
        WeekLeaveHomeTimes: { screen: WeekLeaveHomeTimesPage },
        SocialDistance: { screen: SocialDistancePage },
        ProtectionUsage: { screen: ProtectionUsagePage },
        TouchingPrecaution: { screen: TouchingPrecautionPage },
        HomePrecautions: { screen: HomePrecautionsPage },
        OutsideWork: { screen: OutsideWorkPage },
        RelativesLeavingHome: { screen: RelativesLeavingHomePage },
        RelativesHomePrecautions: { screen: RelativesHomePrecautionsPage },
        FinishRemaining: { screen: FinishRemainingPage },
        FinishComplete: { screen: FinishCompletePage }
    },
    {
        initialRouteName: 'Disclaimer'
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