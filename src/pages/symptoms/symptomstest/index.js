import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import { Colors } from '../../../themes/variables';

import { LeftComponent, CenterComponent } from '../../../components/customheader';
import CustomHiddenView  from '../../../components/customhiddenview';
import { ContinueRequiredButton } from '../../../components/custombutton';
import { CheckboxItemWithExpand, RadioButtonYesOrNoItem} from '../../../components/customcheckboxitem';

export default class SymptomsTestPage extends Component {

    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
     static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            photo:"",
            name:"MARIA JOSÉ DA SILVA",
            symptonsSelected: [],
            showSymptons: null,
            testDate:this.props.navigation.state.params.testDate,
            testResult:this.props.navigation.state.params.testResult,
            symptonsList: [
                { identifier: "Falta de Ar", check:false, start:"",end:""},
                { identifier: "Tonturas", check:false, start:"",end:""},
                { identifier: "Desmaio", check:false, start:"",end:""},
                { identifier: "Febre", check:false, start:"",end:""},
                { identifier: "Falta de apetite", check:false, start:"",end:""},
                { identifier: "Produção de catarro", check:false, start:"",end:""},
                { identifier: "Confusão", check:false, start:"",end:""},
                { identifier: "Cansaço", check:false, start:"",end:""},
                { identifier: "Tosse", check:false, start:"",end:"" },
                { identifier: "Dor de Garganta", check:false, start:"",end:""},
                { identifier: "Fadiga", check:false, start:"",end:""},
                { identifier: "Dor no Corpo", check:false, start:"",end:""},
                { identifier: "Dor de Cabeça", check:false, start:"",end:""},
                { identifier: "Dor no Peito", check:false, start:"",end:""},
                { identifier: "Tosse com sangue", check:false, start:"",end:""},
                { identifier: "Náusea ou vômito", check:false, start:"",end:""},
                { identifier: "Dor de barriga", check:false, start:"",end:""},
                { identifier: "Diarréia", check:false, start:"",end:""},
                { identifier: "Olhos vermelhos", check:false, start:"",end:""},
                { identifier: "Não tive sintomas", check:false, start:"",end:""}
            ],
        },
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
        console.log(this.props.navigation.state.params)

        let { entity } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <NavigationEvents onDidFocus={() => this.initialize(this.props)} />
                <View style={{ width: "100%", paddingHorizontal: 20 }}>
                    <Header
                        backgroundColor={Colors.secondaryColor}
                        leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                        centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />}
                    />
                </View>
                <IntroText />
                <ScrollView>
                    <View style={styles.middle}>
                        <View style={styles.RadioButtonMiddle}>
                            <RadioButtonYesOrNoItem value={entity.showSymptons} onPressCheckbox={this.onPressCheckBox}/>
                        </View>
                    </View>
                    {entity.showSymptons === true ?  <WhatFelling/> : entity.showSymptons === false && <HaveSymptoms/>}
                    <View style={styles.bottom}>
                        <CustomHiddenView show={entity.showSymptons || entity.showSymptons === false}>
                                <View style={styles.checkboxItemContainer}>
                                    {entity.symptonsList.map((symptons,idx) => {
                                        return (
                                            <View key={idx} style={{ minHeight:40, height: "auto", }}>
                                                <CheckboxItemWithExpand
                                                    identifier={symptons.identifier}
                                                    isChecked={this.isChecked}
                                                    onClickCheck={() => symptons.identifier === "Não tive sintomas" ? this.onClickNoneOfOptions(symptons) : this.onClickCheck(symptons)}
                                                    onPressExpand={()=>{      
                                                        symptons.check = !symptons.check
                                                        
                                                        let newArr = entity.symptonsList

                                                        newArr[newArr.length - 1].check = false

                                                        if(symptons.identifier !== "Não tive sintomas"){
                                                            this.setState({
                                                              symptonsList: newArr
                                                            })
                                                        }
                                                    }}
                                                />
                                                {symptons.check && (
                                                    <View style={styles.dateContainer}>
                                                        <Text style={{
                                                            marginTop:10,
                                                            textAlign:"center",
                                                            fontSize:18,
                                                            fontWeight:"500",
                                                            color:"#828282"
                                                        }}>Desde Quando?</Text>
                                                        <CalendarPicker
                                                            minDate={moment().subtract(14, 'days')}
                                                            maxDate={new Date()}
                                                            startFromMonday={true}
                                                            allowRangeSelection={true}
                                                            selectedDayTextColor={"white"}
                                                            weekdays={['S', 'T', 'Q', 'Q', 'S', 'S', 'D']}
                                                            months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
                                                            previousTitle="Anterior"
                                                            nextTitle="Proximo"
                                                            todayBackgroundColor={"#eee"}
                                                            todayTextStyle={{color:'#828282'}}
                                                            selectedDayColor={Colors.navigatorIconColor}
                                                            onDateChange={(date,type) => this.onHandleDate(date,type,symptons)}
                                                            textStyle={{
                                                                color: '#828282',
                                                            }}
                                                            selectedStartDate={symptons.start}
                                                            selectedEndDate={symptons.end}
                                                        />
                                                    </View>
                                                )}
                                            </View>
                                        );
                                    })}
                                </View>
                        </CustomHiddenView>
                    </View>
                </ScrollView>
                {
                    entity.showSymptons === true ? (
                        <View style={styles.wrapButton}>
                            <ContinueRequiredButton
                                onPress={() => { this.symptonsButtonPress() }}
                                disabled={this.isSymptonsBtnDisabled()} />
                        </View>
                    ) : entity.showSymptons === false && (
                        <View style={styles.wrapButton}>
                            <ContinueRequiredButton
                                onPress={() => { this.symptonsButtonPress() }}
                                disabled={this.isSymptonsBtnDisabled()} />
                        </View>
                    )
                }
            </SafeAreaView>
        )
    };

    onHandleDate = (date, type,symptons) => {
        let { entity } = this.state;
        if (type === 'END_DATE') {
            symptons.end = date._d;
        } else {
            symptons.start = date._d;
        }

        let obj = symptons;

        let indexSyntom = this.state.entity.symptonsSelected.findIndex(item => item.identifier === obj.identifier)
        this.state.entity.symptonsSelected[indexSyntom].start = obj.start
        this.state.entity.symptonsSelected[indexSyntom].end = obj.end

        this.setState({
            symptonsSelected: this.state.entity.symptonsSelected
        })
    
        let newArr = this.state.entity.symptonsList;
        this.setState({
            symptonsList:newArr
        })
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
      onClickCheck = (identifier) => {
          let { entity } = this.state;
          let noneOfOptionsPosition = entity.symptonsSelected.findIndex(selected => selected === "Não tive sintomas");
          if (noneOfOptionsPosition > -1){
              entity.symptonsSelected.splice(noneOfOptionsPosition, 1);
              this.setState({ entity });
           }

          let currentSymptonsPosition = entity.symptonsSelected.findIndex(selected => selected.identifier === identifier.identifier);
          if (currentSymptonsPosition === -1) {
              entity.symptonsSelected.push(identifier);
              identifier.check = true;
              this.setState({ entity });
              return;
          }
          entity.symptonsSelected.splice(currentSymptonsPosition, 1);


          if(!(entity.symptonsSelected.length > 0)){
            identifier.check = false;
            identifier.start = "";
            identifier.end = "";
          }
          this.setState({ entity });

      };
      onClickNoneOfOptions = (identifier) => {
          let { entity } = this.state;
          let noneOfOptionsPosition = entity.symptonsSelected.findIndex(selected => selected.identifier === "Não tive sintomas");
          if (noneOfOptionsPosition > -1) {
              entity.symptonsSelected.splice(noneOfOptionsPosition, 1);
              this.setState({ entity });
              return;
          }
          entity.symptonsSelected = [];
          entity.symptonsSelected.push(identifier);
          this.setState({ entity });
      };

      isChecked = (identifier) => {
          let { entity } = this.state;
          let currentSymptonsPosition = entity.symptonsSelected.findIndex(selected => selected.identifier === identifier);
          return currentSymptonsPosition > -1;
      };
      onLeftButtonPress = () => {
          this.props.navigation.pop();
      };

      isSymptonsBtnDisabled = () => {
          let {entity} = this.state;
          return !(entity.symptonsSelected.length > 0);
      };
      symptonsButtonPress = () => {
        console.log({
            data : this.state.entity.symptonsSelected,
            haveSymptons: this.state.entity.showSymptons,
            testDate:this.state.entity.testDate,
            testResult:this.state.entity.testResult,
        })

      };
}

const IntroText = () => (
    <View style={{marginTop:20}}>
        <View style={styles.textContainer}>
            <View style={styles.centerText}>
                <Text style={styles.simpleText}>Você <Text style={styles.boldText}>está com sintomas</Text></Text>
                <Text style={styles.simpleText}>hoje?</Text>
            </View>
        </View>
    </View>
);

const WhatFelling = () => (
    <View style={styles.textContainer}>
        <View style={styles.centerText}>
            <Text style={styles.boldText}>O que <Text style={styles.simpleText}>você está</Text></Text>
            <Text style={styles.simpleText}>sentindo no momento?</Text>
        </View>
    </View>
);

const HaveSymptoms = () => (
    <View style={styles.textContainer}>
        <View style={styles.centerText}>
            <Text style={styles.simpleText}>Você teve <Text style={styles.boldText}>algum destes</Text></Text>
            <Text style={styles.simpleText}><Text style={styles.boldText}>sintomas</Text> nos últimos 14 dias?</Text>
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
      flex:1,
      marginTop: 15,
      },
    symptomsButton: {
        height: 50,
        width: "100%",
        textAlign: "center"
    },
    dateContainer: {
      height:355,
      backgroundColor: "#ededeb",
      marginBottom:15,
      marginTop:5
    },
    wrapButton:{
      paddingHorizontal:25,
      paddingTop:10,
      width:Dimensions.get("window").width
    }
});
