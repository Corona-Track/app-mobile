import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashPage from '../pages/splash';
import DisclaimerPage from '../pages/disclaimer';
import HomePage from '../pages/home';
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
import RiskProfile from '../pages/profile/riskprofile';
import OrientationPage from '../pages/orientation/index';
import ScheduleOrientation from '../pages/orientation/scheduleOrientation';

import SymptomsPage from '../pages/symptoms/symptom';
import ReportSymptomsPage from '../pages/symptoms/reportsymptoms';
import ReportTestPage from '../pages/symptoms/reporttest';
import SymptomsTestPage from '../pages/symptoms/symptomstest';

import Maps from '../pages/maps';
import PublicUtilityPage from '../pages/publicutility';
import TermsPage from '../pages/terms';

//App internal routes
const ApplicationStackNavigator = createStackNavigator(
  {
    Home: {screen: HomePage},
    Maps: {
      screen: Maps,
      navigationOptions: {
        header: null,
      },
    },
    RiskProfile: {screen: RiskProfile},
    Orientation: {screen: OrientationPage},
    ScheduleOrientation: {screen: ScheduleOrientation},
    PublicUtility: {screen: PublicUtilityPage},

    Symptoms: { screen: SymptomsPage,navigationOptions:{
      header:null
    } },
    ReportSymptoms: { screen: ReportSymptomsPage,navigationOptions:{
      header:null
    }},
    ReportTest: { screen: ReportTestPage ,navigationOptions:{
      header:null
    }},
    SymptomsTest: { screen: SymptomsTestPage ,navigationOptions:{
      header:null
    }},
  },
  {initialRouteName: 'Home'},
);

const EditAcountStackNavigator = createStackNavigator(
  {
    //Update Account
    TookPhoto: {screen: TookPhotoPage, params: {edit:true},},
    PersonalData: {screen: PersonalDataPage, params: {edit:true}},
    PersonalAddress: {screen: PersonalAddressPage , params: {edit:true}},
    AlreadyHadCoronavirus: {screen: AlreadyHadCoronavirusPage , params: {edit:true}},
    AlreadyHadCoronavirusTest: {screen: AlreadyHadCoronavirusTestPage , params: {edit:true}},
    TestResult: {screen: TestResultPage , params: {edit:true}},
    SomeoneDiagnosed: {screen: SomeoneDiagnosedPage , params: {edit:true}},
    SomeoneSuspicious: {screen: SomeoneSuspiciousPage , params: {edit:true}},
    Comorbidities: {screen: ComorbiditiesPage , params: {edit:true}},
    FinishUncontaminated: {screen: FinishUncontaminatedPage , params: {edit:true}},
    FinishContaminated: {screen: FinishContaminatedPage , params: {edit:true}},

    //Preventive Profile
    Medicines: {screen: MedicinesPage, params: {edit:true}},
    AlreadyHadFluVaccine: {screen: AlreadyHadFluVaccinePage, params: {edit:true}},
    WeekLeaveHomeTimes: {screen: WeekLeaveHomeTimesPage, params: {edit:true}},
    SocialDistance: {screen: SocialDistancePage, params: {edit:true}},
    ProtectionUsage: {screen: ProtectionUsagePage, params: {edit:true}},
    TouchingPrecaution: {screen: TouchingPrecautionPage, params: {edit:true}},
    HomePrecautions: {screen: HomePrecautionsPage, params: {edit:true}},
    OutsideWork: {screen: OutsideWorkPage, params: {edit:true}},
    RelativesLeavingHome: {screen: RelativesLeavingHomePage, params: {edit:true}},
    RelativesHomePrecautions: {screen: RelativesHomePrecautionsPage, params: {edit:true}},
    FinishRemaining: {screen: FinishRemainingPage, params: {edit:true}},
    FinishComplete: {screen: FinishCompletePage, params: {edit:true}},

  },
  {
    initialRouteName: 'TookPhoto',
  },
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
    FinishRemaining: {screen: FinishRemainingPage},
    FinishComplete: {screen: FinishCompletePage},

    Terms: {screen: TermsPage},
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
      EditAccount: EditAcountStackNavigator,
    },
    {initialRouteName: 'Splash'},
  ),
);

export default RoutesSwitchNavigator;
