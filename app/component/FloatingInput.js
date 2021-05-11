import React from 'react';
import {View, Text, TextInput} from 'react-native';

import colors from '../config/colors';
import {ms, vs} from '../util/scale';
export default class FloatingLabelInput extends React.Component {
  state = {
    isFocused: false,
  };

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  render() {
    const {label, theme, ...props} = this.props;
    const {isFocused} = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: vs(!isFocused ? 10 : 0),
      fontSize: ms(!isFocused ? 16 : 12),
      color: !isFocused
        ? colors[theme].white
        : this.props.buy
        ? colors[theme].blue
        : colors[theme].red,
    };
    return (
      <View style={{paddingTop: 18}}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          {...props}
          style={{
            fontSize: ms(18),
            color: colors[theme].white,
            borderBottomWidth: 1,
            borderBottomColor: '#555',
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </View>
    );
  }
}
