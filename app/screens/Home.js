import React from 'react';
import {View, Text} from 'react-native';
import {Styles} from '../config/styles';
function Home() {
  return (
    <View style={Styles.Window_Background}>
      <Text style={Styles.Norm_Text_Primary}>Home</Text>
    </View>
  );
}

export default Home;
