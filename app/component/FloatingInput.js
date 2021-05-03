import React from 'react';
import {View, Text, TextInput} from 'react-native';
import colors from '../config/colors';

export default class FloatingLabelInput extends React.Component {
  state = {
    isFocused: false,
  };

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  render() {
    const {label, ...props} = this.props;
    const {isFocused} = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: !isFocused ? 10 : 0,
      fontSize: !isFocused ? 16 : 12,
      color: !isFocused ? colors['dark'].white : colors['dark'].blue,
    };
    return (
      <View style={{paddingTop: 18}}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          {...props}
          style={{
            fontSize: 18,
            color: colors['dark'].white,
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
