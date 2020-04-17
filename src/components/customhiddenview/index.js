import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';


export default class CustomHiddenView extends Component {
    static propTypes = {
    	 show: PropTypes.bool,
    	 children:  PropTypes.oneOfType([
                       PropTypes.string,
                       PropTypes.element,
                       PropTypes.number,
                       PropTypes.arrayOf(PropTypes.oneOfType([
                         PropTypes.string,
                         PropTypes.number,
                         PropTypes.element,
                       ])),
                     ]).isRequired,
     };
    constructor(props) {
        super(props);
     }

     render = () => {
        const {children, show} = this.props;
        if(!show){
            return null;
        }
        return(
                <View>{children}</View>
        );
     }
}