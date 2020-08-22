import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {Styles} from '../config/styles';
import {Colors} from '../config/colors';
function Login() {
  return (
    <View style={Styles.Window_Background}>
      <StatusBar
        backgroundColor={Colors.secondaryTextColor}
        barStyle="dark-content"
      />
      <Text style={Styles.Norm_Text_Secondary}>Login</Text>
    </View>
  );
}

export default Login;
