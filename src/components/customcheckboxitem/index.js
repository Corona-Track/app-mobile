import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../themes/variables';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CheckboxItem = ({identifier, isChecked, onClickCheck}) => {
  let checked = isChecked(identifier);
  return (
    <View key={identifier} style={styles.checkboxContainer}>
      <View style={styles.firstColumn}>
        <CheckBox
          checkedColor={Colors.blue}
          containerStyle={styles.checkbox}
          checked={checked}
          onPress={() => {
            onClickCheck(identifier);
          }}
        />
      </View>
      <View>
        <Text style={styles.checkboxText}>{identifier}</Text>
      </View>
    </View>
  );
};

export const CheckboxItemWithPlus = ({
  identifier,
  isChecked,
  onClickCheck,
  onPressPlus,
}) => {
  let checked = isChecked(identifier);
  return (
    <View style={styles.checkboxWithPlusContainer}>
      <View style={styles.firstColumn}>
        <CheckBox
          checkedColor={Colors.blue}
          containerStyle={styles.checkbox}
          checked={checked}
          onPress={() => {
            onClickCheck(identifier);
          }}
        />
      </View>
      <View style={styles.secondColumn}>
        <Text style={styles.checkboxText}>{identifier}</Text>
        <PlusIcon onPressPlus={onPressPlus} />
      </View>
    </View>
  );
};

export const CheckboxItemWithExpand = ({
  identifier,
  isChecked,
  onClickCheck,
  onPressExpand,
  isExpanded,
}) => {
  if (typeof isChecked === 'function') {
    isChecked = isChecked();
  }
  return (
    <View style={styles.checkboxWithExpandContainer}>
      <View style={styles.firstColumn}>
        <CheckBox
          checkedColor={Colors.blue}
          containerStyle={styles.checkbox}
          checked={isChecked}
          onPress={() => {
            onClickCheck(identifier);
          }}
        />
      </View>
      <View style={styles.secondColumn}>
        <Text style={styles.expandCheckboxText}>{identifier}</Text>
        <ExpandIcon
          onPress={() => {
            onPressExpand(identifier);
          }}
          isExpanded={isExpanded}
        />
      </View>
    </View>
  );
};

export const RadioButtonYesOrNoItem = ({
  value,
  onPressCheckbox,
  yesTitle,
  noTitle,
}) => {
  return (
    <View style={styles.checkboxContainer}>
      <CheckBox
        containerStyle={styles.radioButtonContainer}
        textStyle={styles.radioButtonText}
        center
        title={yesTitle ?? 'SIM'}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checkedColor={Colors.blue}
        checked={value === true}
        onPress={() => onPressCheckbox(true)}
      />
      <CheckBox
        containerStyle={styles.radioButtonContainer}
        textStyle={styles.radioButtonText}
        center
        title={noTitle ?? 'NÃO'}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checkedColor={Colors.blue}
        checked={value === false}
        onPress={() => onPressCheckbox(false)}
      />
    </View>
  );
};

export const RadioButtonItem = ({identifier, isChecked, onClickCheck}) => {
  let checked = isChecked(identifier);
  return (
    <View key={identifier} style={styles.radioButtonBox}>
      <CheckBox
        containerStyle={styles.radioButtonContainer}
        textStyle={styles.radioButtonText}
        title={identifier}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checkedColor={Colors.blue}
        checked={checked}
        onPress={() => onClickCheck(identifier)}
      />
    </View>
  );
};

export const SubCheckboxItem = ({identifier, isChecked, onClickCheck}) => {
  let checked = isChecked(identifier);
  return (
    <View key={identifier} style={styles.subCheckboxContainer}>
      <View style={styles.firstColumn}>
        <CheckBox
          checkedColor={Colors.blue}
          containerStyle={styles.checkbox}
          checked={checked}
          onPress={() => {
            onClickCheck(identifier);
          }}
        />
      </View>
      <View>
        <Text style={styles.checkboxText}>{identifier}</Text>
      </View>
    </View>
  );
};

const ExpandIcon = ({onPress, isExpanded}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        name={isExpanded ? 'chevron-up' : 'chevron-down'}
        size={26}
        color={'#828282'}
      />
    </TouchableOpacity>
  );
};

const PlusIcon = ({onPressPlus}) => {
  return (
    <TouchableOpacity onPress={onPressPlus}>
      <Icon name="plus" size={25} color={Colors.navigatorIconColor} />
    </TouchableOpacity>
  );
};

export const RadioButtonTripleItem = ({
  value,
  onPressCheckbox,
  firstTitle,
  secondTitle,
  thirdTitle,
}) => {
  return (
    <View style={styles.tripleCheckboxContainer}>
      <View style={{width: '33.3%'}}>
        <CheckBox
          containerStyle={[styles.radioButtonContainer]}
          textStyle={styles.radioButtonText}
          center
          title={firstTitle}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.navigatorIconColor}
          checked={value === firstTitle}
          onPress={() => onPressCheckbox(firstTitle)}
        />
      </View>
      <View style={{width: '33.3%'}}>
        <CheckBox
          containerStyle={styles.radioButtonContainer}
          textStyle={styles.radioButtonText}
          center
          title={secondTitle}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.navigatorIconColor}
          checked={value === secondTitle}
          onPress={() => onPressCheckbox(secondTitle)}
        />
      </View>
      <View style={{width: '33.3%'}}>
        <CheckBox
          containerStyle={styles.radioButtonContainer}
          textStyle={styles.radioButtonText}
          center
          title={thirdTitle}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.navigatorIconColor}
          checked={value === thirdTitle}
          onPress={() => onPressCheckbox(thirdTitle)}
        />
      </View>
    </View>
  );
};

export const RadioButtonTripleResizableItem = ({
  value,
  onPressCheckbox,
  firstTitle,
  secondTitle,
  thirdTitle,
}) => {
  return (
    <View style={styles.tripleCheckboxContainer}>
      <View style={styles.firstColumn}>
        <CheckBox
          checkedColor={Colors.blue}
          containerStyle={styles.checkbox}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={value === firstTitle}
          onPress={() => onPressCheckbox(firstTitle)}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.resizebleCheckboxText}>{firstTitle}</Text>
      </View>
      <View style={styles.firstColumn}>
        <CheckBox
          checkedColor={Colors.blue}
          containerStyle={styles.checkbox}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={value === secondTitle}
          onPress={() => onPressCheckbox(secondTitle)}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.resizebleCheckboxText}>{secondTitle}</Text>
      </View>
      <TouchableOpacity style={styles.firstColumn}>
        <CheckBox
          checkedColor={Colors.blue}
          containerStyle={styles.checkbox}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={value === thirdTitle}
          onPress={() => onPressCheckbox(thirdTitle)}
        />
      </TouchableOpacity>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.resizebleCheckboxText}>{thirdTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxWidth: 275,
    marginVertical: 10,
    fontFamily: Colors.fontFamily,
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
  checkboxText: {
    fontFamily: Colors.fontFamily,
    fontWeight: 'normal',
    fontSize: 14,
    color: Colors.placeholderTextColor,
    maxWidth: 275,
  },
  expandCheckboxText: {
    fontFamily: Colors.fontFamily,
    fontWeight: 'normal',
    fontSize: 14,
    color: Colors.placeholderTextColor,
    maxWidth: 275,
    justifyContent: 'center',
  },
  firstColumn: {
    width: 44,
  },
  secondColumn: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxWithPlusContainer: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 275,
    marginVertical: 10,
    fontFamily: Colors.fontFamily,
    paddingHorizontal: 20,
  },
  checkboxWithExpandContainer: {
    flex: 1,
    flexDirection: 'row',
    fontFamily: Colors.fontFamily,
    paddingHorizontal: 20,
  },
  radioButtonContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    height: '100%',
  },
  radioButtonText: {
    fontWeight: 'normal',
    fontFamily: Colors.fontFamily,
    fontSize: 14,
    color: Colors.placeholderTextColor,
  },
  radioButtonBox: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 275,
    fontFamily: Colors.fontFamily,
    height: '100%',
  },
  subCheckboxContainer: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 200,
    marginVertical: 10,
    fontFamily: Colors.fontFamily,
  },
  tripleCheckboxContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    fontFamily: Colors.fontFamily,
    justifyContent: 'center',
  },
  resizebleCheckboxText: {
    fontFamily: Colors.fontFamily,
    fontWeight: 'normal',
    fontSize: 14,
    color: Colors.placeholderTextColor,
  },
});
