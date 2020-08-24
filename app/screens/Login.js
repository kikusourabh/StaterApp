import React, {useState} from 'react';
import {View, Text, StatusBar, SafeAreaView, Image} from 'react-native';
import {Styles} from '../config/styles';
import {Colors} from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

function Login({navigation}) {
  const [isValid, setIsValid] = useState({
    email: true,
    pass: true,
  });
  const [credentials, setCredentials] = useState({});

  const CheckCredentials = () => {
    console.log('====================================');
    console.log('Email: ' + credentials.email);
    console.log('Password: ' + credentials.pass);
    console.log('====================================');
    if (isValid.email && isValid.pass) {
      navigation.navigate('Home');
    }
  };

  const navigatToRegistration = () => {
    navigation.navigate('Registration');
  };

  const checkPassword = (text) => {
    if (
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        text,
      )
    ) {
      setCredentials({
        email: credentials.email,
        pass: text,
      });
      setIsValid({email: isValid.email, pass: true});
    } else {
      setIsValid({email: isValid.email, pass: false});
    }
  };

  const checkEmail = (text) => {
    if (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(text)) {
      setIsValid({email: true, pass: isValid.pass});
      setCredentials({
        email: text,
        pass: credentials.pass,
      });
    } else {
      setIsValid({email: false, pass: isValid.pass});
    }
  };
  return (
    <SafeAreaView style={Styles.Window_Background}>
      <StatusBar
        backgroundColor={Colors.Window_Background}
        barStyle="dark-content"
      />
      <View
        style={{
          flex: 1,
          padding: 20,
        }}>
        <View style={Styles.HeaderView}>
          <Image source={require('../assets/logo.png')} />
          <View style={{marginTop: 30}}>
            <Text
              style={[
                Styles.Header_Text,
                {fontSize: 45, color: Colors.primaryDarkColor},
              ]}>
              Hello
            </Text>
            <Text
              style={[
                Styles.Sub_Header_Text,
                {color: Colors.primaryDarkColor},
              ]}>
              Login to your account
            </Text>
          </View>
        </View>
        <View style={Styles.FotterView}>
          <View style={Styles.Card}>
            <Icon
              name="email"
              size={30}
              style={Styles.IconStyle}
              color={Colors.white}
            />
            <TextInput
              placeholder="Email"
              style={Styles.InputStyle}
              placeholderTextColor={Colors.primaryTextColor}
              keyboardType="email-address"
              autoCompleteType="email"
              onChangeText={(e) => checkEmail(e)}
            />
          </View>
          {isValid.email ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={Styles.ErrorMsg}>Email is not valid</Text>
            </Animatable.View>
          )}

          <View style={Styles.Card}>
            <Icon
              name="lock"
              size={30}
              style={Styles.IconStyle}
              color={Colors.white}
            />
            <TextInput
              placeholder="Password"
              style={Styles.InputStyle}
              placeholderTextColor={Colors.primaryTextColor}
              secureTextEntry={true}
              autoCompleteType="password"
              onChangeText={(e) => checkPassword(e)}
            />
          </View>
          {isValid.pass ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={Styles.ErrorMsg}>Password is not valid</Text>
            </Animatable.View>
          )}

          <TouchableOpacity onPress={CheckCredentials}>
            <View style={Styles.Button}>
              <Text style={[Styles.Header_Text, Styles.ButtonText]}>Login</Text>
            </View>
          </TouchableOpacity>

          <View style={Styles.BottomTextContainer}>
            <Text
              style={[
                Styles.Header_Text,
                Styles.BottomText,
                {
                  alignSelf: 'auto',
                  marginTop: 0,
                },
              ]}>
              Don't have a account?
            </Text>
            <Text
              onPress={navigatToRegistration}
              style={[Styles.Header_Text, {color: Colors.primaryDarkColor}]}>
              {' '}
              Sign up
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Login;
