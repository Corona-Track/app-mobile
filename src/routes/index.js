import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import AuthLoading from '../pages/authLoading';

import SplashPage from '../pages/splash';
import DisclaimerPage from '../pages/disclaimer';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import TookPhotoPage from '../pages/createAccount/tookphoto';
import TakePhotoPage from '../pages/createAccount/takephoto';
import PersonalDataPage from '../pages/createAccount/personaldata';
import PersonalAddressPage from '../pages/createAccount/personaladdress';
import AlreadyHadCoronavirusPage from '../pages/createAccount/alreadyhadcoronavirus';
import SomeoneDiagnosedPage from '../pages/createAccount/someonediagnosed';
import SomeoneSuspiciousPage from '../pages/createAccount/someonesuspicious';
import ComorbiditiesPage from '../pages/createAccount/comorbidities';
import FinishUncontaminatedPage from '../pages/createAccount/finishuncontaminated';
import AlreadyHadCoronavirusTestPage from '../pages/createAccount/alreadyhadcoronavirustest';
import TestResultPage from '../pages/createAccount/testresult';
import FinishContaminatedPage from '../pages/createAccount/finishcontaminated';

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

//App internal routes
const ApplicationStackNavigator = createStackNavigator(
  {
    Home: {screen: HomePage},
    //AA: { screen: AAPage },
  },
  {initialRouteName: 'Home'},
);

//App external routes
const AuthenticationStackNavigator = createStackNavigator(
  {
    //Create Account
    Disclaimer: {screen: DisclaimerPage},
    TakePhoto: {screen: TakePhotoPage},
    TookPhoto: {screen: TookPhotoPage},
    PersonalData: {screen: PersonalDataPage},
    PersonalAddress: {screen: PersonalAddressPage},
    AlreadyHadCoronavirus: {screen: AlreadyHadCoronavirusPage},
    AlreadyHadCoronavirusTest: {screen: AlreadyHadCoronavirusTestPage},
    TestResult: {screen: TestResultPage},
    SomeoneDiagnosed: {screen: SomeoneDiagnosedPage},
    SomeoneSuspicious: {screen: SomeoneSuspiciousPage},
    Comorbidities: {screen: ComorbiditiesPage},
    FinishUncontaminated: {screen: FinishUncontaminatedPage},
    FinishContaminated: {screen: FinishContaminatedPage},

    Login: {screen: LoginPage},
    // Splash: {screen: SplashPage},

    //Preventive Profile
    Medicines: {screen: MedicinesPage},
    AlreadyHadFluVaccine: {screen: AlreadyHadFluVaccinePage},
    WeekLeaveHomeTimes: {screen: WeekLeaveHomeTimesPage},
    SocialDistance: {screen: SocialDistancePage},
    ProtectionUsage: {screen: ProtectionUsagePage},
    TouchingPrecaution: {screen: TouchingPrecautionPage},
    HomePrecautions: {screen: HomePrecautionsPage},
    OutsideWork: {screen: OutsideWorkPage},
    RelativesLeavingHome: {screen: RelativesLeavingHomePage},
    RelativesHomePrecautions: {screen: RelativesHomePrecautionsPage},
  },
  {
    initialRouteName: 'Disclaimer',
  },
);

const RoutesSwitchNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashPage,
      Authentication: AuthenticationStackNavigator,
      Application: ApplicationStackNavigator,
    },
    {initialRouteName: 'Splash'},
  ),
);

export default RoutesSwitchNavigator;
