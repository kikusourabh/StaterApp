import React from 'react';
import {View, Text, SafeAreaView, StatusBar, Platform} from 'react-native';
import {Styles} from '../config/styles';
import {Colors} from '../config/colors';
function Home() {
  return (
    <SafeAreaView style={Styles.Window_Background}>
      <StatusBar
        backgroundColor={
          Platform.OS === 'android'
            ? Colors.primaryDarkColor
            : Colors.Window_Background
        }
        barStyle="dark-content"
      />
      {/* <View style={ActionBar} */}
      <View
        style={{
          flex: 1,
          padding: 20,
        }}>
        <View
          style={[
            Styles.HeaderView,
            {backgroundColor: Colors.primaryDarkColor},
          ]}>
          <Text style={Styles.Header_Text}>Header</Text>
        </View>
        <View
          style={[
            Styles.FotterView,
            {backgroundColor: Colors.secondaryDarkColor},
          ]}>
          <Text style={[Styles.Header_Text, {color: Colors.primaryDarkColor}]}>
            Fotter
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;
