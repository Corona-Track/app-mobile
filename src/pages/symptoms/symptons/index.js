import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header, Avatar, Divider } from 'react-native-elements';
import { NavigationActions, StackActions, NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import { RadioButton, IconButton, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import { Colors } from '../../../themes/variables';


import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { SimpleDateTextInput } from '../../../components/customtextinput';
import CustomHiddenView  from '../../../components/customhiddenview';
import { ContinueRequiredButton, DoubtButton } from '../../../components/custombutton';
import { CheckboxItem, CheckboxItemWithPlus, CheckboxItemWithExpand, RadioButtonYesOrNoItem, RadioButtonTripleResizableItem, RadioButtonItem } from '../../../components/customcheckboxitem';

export default class SymptomsPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
     static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            symptonsSelected: [],
            hasSymptonsList: [],
            symptonsStartDate:null,
            symptonsendDate: null,
            showSymptons: null,
            hasSymptons: null,
            hasOximeter: null,
            hasSaturation: null,
            shortBreath: null,
            shortBreathAnswer: null,
            symptonsList: [
                { identifier: "Falta de Ar" },
                { identifier: "Tontura" },
                { identifier: "Desmaio" },
                { identifier: "Febre" },
                { identifier: "Tosse" },
                { identifier: "Dor de Garganta" },
                { identifier: "Fadiga" },
                { identifier: "Dor no Corpo" },
                { identifier: "Diarréia" },
                { identifier: "Não tive sintomas" }
            ],
        },
        breathConditionList: [
            { identifier: "Leve: falta de are ao fazer algum tipo de esforço físico" },
            { identifier: "Moderada: não conseguir completar frases sem precisar respirar no meio" },
            { identifier: "Grave: falta de ar quando em repouso, respiração acelerada, sensação de estar se afogando" },
           ],
        minimumDate: new Date(1900, 1, 1),
        maximumDate: moment(moment().format("DD/MM/YYYY"), 'DD/MM/YYYY').add(-13, "years").toDate(),
        showDatePicker: false,
        continueNoSymptons: false,
    };

    initialize(props) {
        if (!props)
            return;
        let { navigation } = props;
        let { entity } = this.state;
        let previousEntity = navigation.getParam('entity', null);
        if (!previousEntity)
            return;
        let converted = {
            ...entity,
            ...previousEntity
        };
        this.setState({ entity: converted });



    };

    render = () => {
        let { entity, minimumDate, maximumDate, showDatePicker, continueNoSymptons, breathConditionList} = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <NavigationEvents onDidFocus={() => this.initialize(this.props)} />
                <View style={{ width: "100%", paddingHorizontal: 20 }}>
                    <Header
                        backgroundColor={Colors.secondaryColor}
                        leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                        centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />}
                        rightComponent={<RightComponent onPress={this.onRightButtonPress} />} />
                </View>
                <IntroText />
                <ScrollView>
                    <View style={styles.middle}>
                        <View style={styles.RadioButtonMiddle}>
                            <RadioButtonYesOrNoItem value={entity.showSymptons} onPressCheckbox={this.onPressCheckBox}/>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <CustomHiddenView show={entity.showSymptons}>
                            <CustomHiddenView show={entity.hasSymptons}>
                                <View>
                                    {this.state.entity.hasSymptonsList.map(symp => {
                                         return (
                                             <View style={{ height: 40, paddingHorizontal: 20, flexDirection: 'column' }}>
                                                 <CheckboxItemWithExpand
                                                     identifier={symp}
                                                     isChecked={this.isCheckedTrue}
                                                     onClickCheck={()=>{
                                                        this.setState({
                                                            isChecked:!this.state.isChecked
                                                        })
                                                      }}
                                                      onPressExpand={()=>{
                                                          this.setState({
                                                              isChecked:!this.state.isChecked
                                                          })
                                                        }}
                                                     />
                                             </View>
                                         );
                                     })}
                                </View>
                                <View style={styles.dateContainer}>
                                         <CalendarPicker
                                            startFromMonday={true}
                                            allowRangeSelection={true}
                                             weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
                                              months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
                                              previousTitle="Anterior"
                                              nextTitle="Próximo"
                                              todayBackgroundColor="#f8f8f7"
                                              selectedDayColor={Colors.navigatorIconColor}
                                           onDateChange={this.onHandleDate}
                                         />
                                </View>
                                <View style={styles.oximeterContainer}>
                                    <OximeterText />
                                    <View style={styles.oximeterContainerRadioBtn}>
                                        <RadioButtonYesOrNoItem value={entity.hasOximeter} onPressCheckbox={this.onPressCheckBoxOximeter}/>
                                    </View>
                                </View>
                                <CustomHiddenView show={entity.hasOximeter}>
                                    <View style={styles.oximeterContainer}>
                                        <SaturationText />
                                        <View style={styles.oximeterContainerRadioBtn}>
                                            <RadioButtonYesOrNoItem value={entity.hasSaturation} onPressCheckbox={this.onPressCheckBoxSaturation}/>
                                        </View>
                                     </View>
                                </CustomHiddenView>
                                <CustomHiddenView show={entity.shortBreath}>
                                    <View style={styles.breathContainer}>
                                        <AirBreathText />
                                     <View style={{ justifyContent: "center" }}>
                                        {breathConditionList.map(situation => {
                                            return (
                                                <View style={{ height: 70 }}>
                                                    <RadioButtonItem
                                                        identifier={situation.identifier}
                                                        isChecked={this.isCheckedBreath}
                                                        onClickCheck={this.onClickRadioBreath} />
                                                </View>
                                            );
                                        })}
                                    </View>
                                    </View>
                                </CustomHiddenView>

                            </CustomHiddenView>


                             <View style={styles.checkboxItemContainer}>
                                 {entity.symptonsList.map(symptons => {
                                     return (
                                         <View style={{ height: 40, paddingHorizontal: 20, flexDirection: 'column' }}>
                                             <CheckboxItemWithExpand
                                                 identifier={symptons.identifier}
                                                 isChecked={this.isChecked}
                                                 onClickCheck={symptons.identifier === "Não tive sintomas" ? this.onClickNoneOfOptions : this.onClickCheck}
                                                  onPressExpand={()=>{
                                                       this.setState({
                                                           isChecked:!this.state.isChecked
                                                       })
                                                     }}
                                                 />
                                         </View>
                                     );
                                 })}
                             </View>
                             <View>
                                 <ContinueRequiredButton
                                     onPress={() => { this.symptonsButtonPress() }}
                                     disabled={this.isSymptonsBtnDisabled()} />
                              </View>
                        </CustomHiddenView>
                         <CustomHiddenView show={continueNoSymptons}>
                            <ContinueRequiredButton
                             onPress={() => { this.noSymptons() }}
                             disabled={false} />
                         </CustomHiddenView>
                    </View>
                </ScrollView>
            </SafeAreaView>
            )
    };

    isCheckedBreath = (identifier) => {
        let { entity } = this.state;
        return entity.shortBreathAnswer === identifier;
    };
    onClickRadioBreath = identifier => {
        let { entity } = this.state;
        entity.shortBreathAnswer = identifier;
        this.setState({ entity });
    };
    onHandleDate = (date, type) => {
        let { entity } = this.state;
        if (type === 'END_DATE') {
            entity.symptonsendDate = date;
            this.setState({
                entity: entity,
                showDatePicker: false
            });
        } else {
            entity.symptonsStartDate = date;
          this.setState({
              entity: entity,
              showDatePicker: false
          });
        }
    };
     onPressDatePicker = () => {
        this.setState({ showDatePicker: true });
    };

    onPressCheckBox = value => {
        let { entity } = this.state;
        entity.showSymptons = value;
        this.setState({ entity });
        if(!entity.showSymptons){
            this.setState({continueNoSymptons: true});
        }else{
            this.setState({continueNoSymptons: false});
        }

    };
    onChangeAirBreathAnswer = value => {
        let { entity } = this.state;
        entity.shortBreathAnswer = value;
        this.setState({ entity });
    };

    checkBreath = () => {
        let { entity } = this.state;
        let shortBreathPosition = entity.symptonsSelected.findIndex(selected => selected === "Falta de Ar");
        let shortBreathPosition2 = entity.hasSymptonsList.findIndex(selected => selected === "Falta de Ar");
        if ((shortBreathPosition > -1) || (shortBreathPosition2 > -1) ){
            entity.shortBreath = true;
        }else {
            entity.shortBreath = false;
        }
        this.setState({ entity });
    }

    onPressCheckBoxOximeter = value => {
        let { entity } = this.state;
        entity.hasOximeter = value;
        this.checkBreath();
        this.setState({ entity });
    };
    onPressCheckBoxSaturation = value => {
         let { entity } = this.state;
         entity.hasSaturation = value;
         this.setState({ entity });
     };
    onChangeSelected = () => {
        data => this.setState({ data });
        let val = this.state.data.find(e => e.selected == true);
        if(val.value == 'NO'){
            this.ShowHideComponent(false);
        }else if(val.value == 'YES'){
            //Show hidden area
            this.ShowHideComponent(true);
        }
    };
    onBackClick = () => {
        this.props.navigation.navigate("Home");
    }

     onPressRadioBtn = data => this.setState({ data });
     ShowHideComponent = (val) => {
         if (val== true) {
           this.setState({ showSymptons: true });
         } else {
           this.setState({ showSymptons: false });
         }
      };

      onClickCheck = (identifier) => {
          let { entity } = this.state;
          let noneOfOptionsPosition = entity.symptonsSelected.findIndex(selected => selected === "Não tive sintomas");
          if (noneOfOptionsPosition > -1){
              entity.symptonsSelected.splice(noneOfOptionsPosition, 1);
              entity.hasSymptons = false;
              entity.hasOximeter = false;
              entity.hasSaturation = false;
              this.checkBreath();
              this.setState({ entity });
           }

          let currentSymptonsPosition = entity.symptonsSelected.findIndex(selected => selected === identifier);
          if (currentSymptonsPosition === -1) {
              entity.symptonsSelected.push(identifier);
              this.checkBreath();
              this.setState({ entity });
              return;
          }
          entity.symptonsSelected.splice(currentSymptonsPosition, 1);


          if(!(entity.symptonsSelected.length >0)){
            entity.hasSymptons = false;
            entity.hasOximeter = false;
            entity.hasSaturation = false;
            this.checkBreath();
          }
          this.setState({ entity });

      };
      onClickNoneOfOptions = (identifier) => {
          let { entity } = this.state;
          let noneOfOptionsPosition = entity.symptonsSelected.findIndex(selected => selected === "Não tive sintomas");
          if (noneOfOptionsPosition > -1) {
              entity.symptonsSelected.splice(noneOfOptionsPosition, 1);
              entity.hasSymptons = false;
              entity.hasOximeter = false;
              entity.hasSaturation = false;
              this.setState({ entity });
              return;
          }
          entity.symptonsSelected = [];
          entity.symptonsSelected.push(identifier);
          entity.hasSymptons = false;
          entity.hasOximeter = false;
          entity.hasSaturation = false;
          this.setState({ entity });
      };

    isCheckedTrue = (identifier) => {
          return true;
      };
      isChecked = (identifier) => {
          let { entity } = this.state;
          let currentSymptonsPosition = entity.symptonsSelected.findIndex(selected => selected === identifier);
          return currentSymptonsPosition > -1;
      };
      onLeftButtonPress = () => {
          this.props.navigation.pop();
      };
      onRightButtonPress = () => {
          this.props.navigation.pop();
      };

      noSymptons = () => {
        //No Symptons Button
        console.log("Go to action without Symptons");
      };

      isSymptonsBtnDisabled = () => {
          let {entity} = this.state;
          return !(entity.symptonsSelected.length > 0);
      };
      symptonsButtonPress = () => {
          let { entity } = this.state;
          if (entity.symptonsSelected.length > 0){
              entity.hasSymptons = true;
              this.checkBreath();
              this.setState({ entity });
          }else{
              this.setState({ entity });
          }
          if((entity.hasSymptonsList.length > 0)){
               entity.hasSymptonsList = entity.symptonsSelected;
               this.setState({ entity });
               //Go
                console.log("Go to action with Symptons");
          }else{
                entity.hasSymptonsList = entity.symptonsSelected;
                this.checkBreath();
                this.setState({ entity });
          }

      };

}
const IntroText = () => (
    <View style={styles.textContainer}>
        <View style={styles.centerText}>
            <Text style={styles.simpleText}>Você <Text style={styles.boldText}>está com sintomas</Text></Text>
            <Text style={styles.simpleText}>no momento?</Text>
        </View>
    </View>
);

const OximeterText = () => (
    <View style={styles.textContainer}>
        <View style={styles.centerText}>
            <Text style={styles.boldText}>Possui Oxímetro em casa? </Text>
        </View>
    </View>
);

const SaturationText = () => (
    <View style={styles.textContainer}>
        <View style={styles.centerText}>
            <Text style={styles.boldText}>A saturação de oxigênico </Text>
            <Text style={styles.boldText}>está acima de 93%?</Text>
        </View>
    </View>
);

const AirBreathText = () => (
    <View style={styles.textContainer}>
        <View style={styles.centerText}>
            <Text style={styles.boldText}>Como seria esta falta de ar?</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.secondaryColor,
        height: "100%",
        paddingBottom: 15
    },
    logo: {
        height: 150,
        width: 210,
    },
    simpleText: {
        fontFamily: Colors.fontFamily,
        fontSize: 15
    },
    boldText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    centerText: {
        alignItems: "center",
    },
    centerTextGrey: {
        alignItems: "center",
        backgroundColor: "grey",
    },
    top: {
        flex: 0.1,
        width: "100%",
        flexDirection: 'row',
      },
    middle: {
         flex: 0.15,
         backgroundColor: Colors.secondaryColor,
         marginTop: 0,
         alignItems: "center",
         width: "100%",
    },
    RadioButtonMiddle: {
        alignSelf: "center",
        height: 50,
    },
     bottom: {
         flex: 0.9,
         backgroundColor: Colors.secondaryColor,
         width: "100%",
         borderBottomLeftRadius: 20,
         borderBottomRightRadius: 20,
         marginTop: 5,
       },
       checkboxItemContainer:{
        marginTop: 15,
       },
     headerFig: {
        flex: 0.2,
         backgroundColor: "pink",
       },
     headerTxt: {
        color: Colors.primaryHeaderColor,
        marginLeft: 15,
        textTransform: 'uppercase',
        fontWeight: "bold",
     },
    symptomsButtonContainer: {
        width: '100%',
        marginTop: 20,
        borderRadius: 50,
    },
    symptomsButton: {
        height: 50,
        width: "100%",
        textAlign: "center"
    },
    symptomsButtonText: {
        color: Colors.primaryTextColor,
        fontFamily: Colors.fontFamily
    },
    symptonsButtonText: {
        color: Colors.primaryTextColor,
        fontFamily: Colors.fontFamily,
     },


    leftComponentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      dateContainer: {
        backgroundColor: "#ededeb",
      },
      oximeterContainer: {
      backgroundColor: "#ededeb",
      marginTop: 2,
      alignItems: "center",
      height: 100,
      width: "100%",
      },
      breathContainer: {
      backgroundColor: "#ededeb",
        marginTop: 2,
        alignItems: "center",
        width: "100%",
      },
      oximeterContainerRadioBtn: {
        alignSelf: "center",
        height: 50,
      },
});
