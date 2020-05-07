import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { LeftComponent, CenterComponent } from '../../../components/customheader';
import { Header } from 'react-native-elements';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import { Colors } from '../../../themes/variables';

import blueVirus from '../../../assets/images/blueVirus.png';
import stethoscope from '../../../assets/images/stethoscope.png';

import { getUser } from '../../../firebase/User';
import { GetSymptomByUser } from '../../../firebase/Symptom';
import { UserConsumer } from '../../../store/user';
import { SymptomConsumer } from '../../../store/symptom';

const SymptomPage = props => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUser().then(doc => {
      let currentUser = doc.data();
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const validation = async (context, contextSymptom, type, route) => {
    setLoading(true);
    try {
      context.updateUser(user);
      const result = await GetSymptomByUser(type);
      let hasTodaysSymptons = false
      if (result && result.length > 0) {
        hasTodaysSymptons = moment(result[0].created_at.toDate()).isSame(moment(), 'day')
      }
      if (hasTodaysSymptons) {
        contextSymptom.updateSymptom({ ...result[0] })

      }
      else {
        contextSymptom.updateSymptom({ type }, true);
      }

      setLoading(false);
      props.navigation.push(route);
    } catch (error) {
      Alert.alert(
        'Aviso',
        'Ocorreu um erro, tente novamente',
        [{ text: 'OK', onPress: () => setLoading(false) }],
        { cancelable: false },
      );
    }
  };

  return (
    <UserConsumer>
      {context => (
        <SymptomConsumer>
          {contextSymptom => (
            <SafeAreaView style={styles.container}>
              <Spinner visible={loading} />
              <View style={{ width: '100%', marginHorizontal: 20 }}>
                <Header
                  backgroundColor={Colors.secondaryColor}
                  leftComponent={<LeftComponent onPress={() => props.navigation.pop()} />}
                  centerComponent={
                    user && (
                      <CenterComponent
                        photo={user.photo}
                        userName={user.name}
                      />
                    )
                  }
                />
              </View>
              <View style={styles.title}>
                <Text style={styles.simpleText}>
                  Minha <Text style={styles.boldText}>saúde:</Text>
                </Text>
              </View>
              <View style={styles.containerButtons}>
                {/* STETHOSCOPE */}
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="transparent"
                  onPress={() =>
                    validation(
                      context,
                      contextSymptom,
                      'symptom',
                      'ReportSymptoms',
                    )
                  }>
                  <View style={styles.wrap}>
                    <View style={styles.circle}>
                      <Image style={styles.stethoscope} source={stethoscope} />
                    </View>
                    <Text style={styles.reportText}>reportar sintomas</Text>
                  </View>
                </TouchableHighlight>
                {/* VIRUS */}
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="transparent"
                  onPress={() =>
                    validation(context, contextSymptom, 'test', 'ReportTest')
                  }>
                  <View style={styles.wrap}>
                    <View style={styles.circle}>
                      <Image style={styles.virus} source={blueVirus} />
                    </View>
                    <Text style={styles.reportText}>reportar teste</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </SafeAreaView>
          )}
        </SymptomConsumer>
      )}
    </UserConsumer>
  );
};

export default SymptomPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryColor,
    height: '100%',
  },
  title: {
    marginTop: 20,
    alignItems: 'center',
  },
  simpleText: {
    fontFamily: Colors.fontFamily,
    fontSize: 18,
    color: '#333',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  containerButtons: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  wrap: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 70,
  },
  circle: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: Colors.blue,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  virus: {
    height: 70,
    width: 70,
    resizeMode: "center"
  },
  stethoscope: {
    width: 70,
    height: 70,
    resizeMode: "center"
  },
  reportText: {
    marginTop: 10,
    fontSize: 18,
    color: Colors.blue,
    fontWeight: '500',
    textTransform: 'uppercase',
    fontFamily: Colors.fontFamily,
  },
});
