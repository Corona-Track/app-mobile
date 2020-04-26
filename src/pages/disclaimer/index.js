import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { NavigationActions, StackActions } from 'react-navigation';

import DisclaimerProgressTracking from '../../components/disclaimerprogresstracking';
import { Colors } from '../../themes/variables';
import { DisclaimerButton } from '../../components/custombutton';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class DisclaimerPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  state = {
    carouselItems: ['first', 'second', 'third', 'fourth'],
    activeIndex: 0,
  };

  renderItem = ({ item }) => {
    if (item === 'first') {
      return <FirstDisclaimerText />;
    }
    if (item === 'second') {
      return <SecondDisclaimerText />;
    }
    if (item === 'third') {
      return <ThirdDisclaimerText />;
    }
    if (item === 'fourth') {
      return <FourthDisclaimerText onPress={() => this.goToLogin()} />;
    }
    return <></>;
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render = () => {
    let { carouselItems, activeIndex } = this.state;
    return (
      <SafeAreaView
        style={{ backgroundColor: Colors.primaryTextColor, height: '100%' }}>
        <Carousel
          data={carouselItems}
          renderItem={this.renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          slideStyle={{ width: viewportWidth }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          onSnapToItem={index => this.setState({ activeIndex: index })}
        />
        <Pagination
          containerStyle={{
            paddingTop: 10,
            marginTop: 10,
            paddingBottom: 5,
            marginBottom: 5,
          }}
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          dotStyle={styles.dotStyle}
          activeSlideAlignment="center"
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </SafeAreaView>
    );
  };
}

const FirstDisclaimerText = () => {
  return (
    <ScrollView style={styles.firstContent}>
      <View style={styles.scrollViewTextContainer}>
        <Text style={[styles.simpleText]}>
          <Text style={[styles.boldText, { fontSize: 22 }]}>
            Olá! Seja bem-vindo
          </Text>
        </Text>
        <Text style={[styles.simpleText, { marginBottom: 30 }]}>
          <Text style={[styles.boldText, { fontSize: 22 }]}>ao Corona Track</Text>
        </Text>

        <Text style={[styles.simpleText]}>Nosso aplicativo tem a</Text>
        <Text style={[styles.simpleText]}>intenção de ajudar você</Text>
        <Text style={[styles.simpleText]}>nessa época de pandemia</Text>
        <Text style={[styles.simpleText]}>de COVID-19, doença</Text>
        <Text style={[styles.simpleText]}>causada pelo novo</Text>
        <Text style={[styles.simpleText]}>coronavírus. Caso queira</Text>
        <Text style={[styles.simpleText]}>usá-lo, saiba que</Text>
        <Text style={[styles.simpleText]}>utilizaremos dados como sua</Text>
        <Text style={[styles.simpleText]}>geolocalização e algumas</Text>
        <Text style={[styles.simpleText]}>informações pessoais para</Text>
        <Text style={[styles.simpleText]}>estimar certos riscos seus</Text>
        <Text style={[styles.simpleText]}>associados ao coronavírus.</Text>

        <Text style={[styles.simpleText, { marginTop: 30 }]}>
          <Text style={[styles.boldText]}>Contamos com sua</Text>
        </Text>
        <Text style={[styles.simpleText]}>
          <Text style={[styles.boldText]}>colaboração </Text>para que juntos
        </Text>
        <Text style={[styles.simpleText]}>tornemos o ambiente mais</Text>
        <Text style={[styles.simpleText]}>seguro a todos.</Text>
      </View>
    </ScrollView>
  );
};

const SecondDisclaimerText = () => {
  return (
    <ScrollView style={styles.firstContent}>
      <View style={styles.scrollViewTextContainer}>
        <Image
          style={styles.pagesImage}
          source={require('../../assets/images/pages.png')}
        />
        <Text style={[styles.simpleText]}>Ao concordar em</Text>
        <Text style={[styles.simpleText]}>compartilhar conosco seus</Text>
        <Text style={[styles.simpleText]}>dados, estimaremos tanto o</Text>
        <Text style={[styles.simpleText]}>seu risco de contágio por</Text>
        <Text style={[styles.simpleText]}>coronavírus quanto o seu</Text>
        <Text style={[styles.simpleText]}>risco de ser internado caso</Text>
        <Text style={[styles.simpleText]}>seja contaminado.</Text>

        <Text style={[styles.simpleText, { marginTop: 20 }]}>Com esses dados,</Text>
        <Text style={[styles.simpleText]}>classificaremos seu perfil</Text>
        <Text style={[styles.simpleText]}>em Verde, Amarelo ou</Text>
        <Text style={[styles.simpleText]}>
          Vermelho <Text style={[styles.boldText]}>para lhe ajudar</Text>
        </Text>
        <Text style={[styles.simpleText]}>
          <Text style={[styles.boldText]}>nas decisões</Text> de como e
      </Text>
        <Text style={[styles.simpleText]}>quando sair de casa.</Text>
      </View>
    </ScrollView>
  );
};

const ThirdDisclaimerText = () => {
  return (
    <ScrollView style={styles.firstContent}>
      <View style={styles.scrollViewTextContainer}>
        <Text style={[styles.simpleText]}>Nosso aplicativo funciona com</Text>
        <Text style={[styles.simpleText]}>base em modelos matemáticos</Text>
        <Text style={[styles.simpleText]}>e não tem a intenção de</Text>
        <Text style={[styles.simpleText]}>substituir uma consulta</Text>
        <Text style={[styles.simpleText]}>médica ou de contrariar as</Text>
        <Text style={[styles.simpleText]}>recomendações do governo </Text>
        <Text style={[styles.simpleText]}>de sua região.</Text>

        <Text style={[styles.simpleText, { marginTop: 20 }]}>
          <Text style={[styles.boldText]}>Esteja atento</Text> às
      </Text>
        <Text style={[styles.simpleText]}>recomendações do Ministério</Text>
        <Text style={[styles.simpleText]}>da Saúde para a sua região</Text>
        <Text style={[styles.simpleText]}>e as recomendações da</Text>
        <Text style={[styles.simpleText]}>Organização Mundial da Saúde.</Text>
        {/* <View style={{flexDirection: 'row', marginTop: 40}}>
        <Image
          style={styles.susImage}
          source={require('../../assets/images/sus.png')}
        />
        <Image
          style={styles.whoImage}
          source={require('../../assets/images/who.png')}
        />
      </View> */}
      </View>
    </ScrollView>
  );
};

const FourthDisclaimerText = ({ onPress }) => {
  return (
    <ScrollView style={styles.firstContent}>
      <View style={styles.scrollViewTextContainer}>
        <Image
          style={styles.hospitalImage}
          source={require('../../assets/images/hospital.png')}
        />
        <Text style={[styles.simpleText]}>Caso deseje ou precise de</Text>
        <Text style={[styles.simpleText]}>uma orientação médica, você</Text>
        <Text style={[styles.simpleText]}>pode usar nossa plataforma</Text>
        <Text style={[styles.simpleText]}>para se conectar com a</Text>
        <Text style={[styles.simpleText]}>Aliança Médica, podendo</Text>
        <Text style={[styles.simpleText]}>assim tirar suas dúvidas com</Text>
        <Text style={[styles.simpleText]}>um médico.</Text>

        <Text style={[styles.simpleText, { marginTop: 20 }]}>
          Caso sinta algo que julgue
      </Text>
        <Text style={[styles.simpleText]}>ser uma urgência, por favor</Text>
        <Text style={[styles.simpleText]}>
          <Text style={[styles.boldText]}>encaminhe-se para o posto</Text>
        </Text>
        <Text style={[styles.simpleText]}>
          <Text style={[styles.boldText]}>de saúde ou pronto-socorro</Text>
        </Text>
        <Text style={[styles.simpleText]}>
          <Text style={[styles.boldText]}>mas próximo.</Text>
        </Text>
        <View style={{ paddingHorizontal: 20, width: '100%', marginTop: 20 }}>
          <DisclaimerButton onPress={() => onPress()} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.buttonPrimaryColor,
    height: '100%',
    paddingBottom: 15,
  },
  scrollViewTextContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: '100%',
  },
  simpleText: {
    fontFamily: Colors.fontFamily,
    fontSize: 19,
    color: Colors.blue,
  },
  boldText: {
    fontWeight: 'bold',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    backgroundColor: Colors.blue,
  },
  firstContent: {
    height: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  pagesImage: {
    marginBottom: 40,
    height: 100,
    width: 80,
  },
  susImage: {
    width: 125,
    height: 50,
    resizeMode: 'contain',
  },
  whoImage: {
    width: 125,
    height: 50,
    resizeMode: 'contain',
  },
  hospitalImage: {
    marginBottom: 20,
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});
