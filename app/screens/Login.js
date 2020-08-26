import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, SafeAreaView, Image, Alert} from 'react-native';

import {Styles} from '../config/styles';
import {Colors} from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../components/context';

// Login Component of MainNav stack navigation
function Login({navigation}) {
  //context method to access MainNav states
  const {setLoginState} = React.useContext(AuthContext);

  //state to check email and password are valid or not
  const [isValid, setIsValid] = useState({
    email: true,
    pass: true,
  });

  //State to store the credentials
  const [credentials, setCredentials] = useState({});

  // this Method check the credentials are valid or not
  // and store them in async storage
  const CheckCredentials = () => {
    if (isValid.email && isValid.pass) {
      getData();
    }
  };

  // This method check the credential
  // are correct or not
  const getData = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const pass = await AsyncStorage.getItem('pass');

      if (email != null && pass != null) {
        let isCredentailCorrect = false;
        if (credentials.email === email) {
          if (credentials.pass === pass) {
            isCredentailCorrect = true;
          } else {
            isCredentailCorrect = false;
          }
        } else {
          isCredentailCorrect = false;
        }
        if (isCredentailCorrect) {
          try {
            await AsyncStorage.setItem('token', credentials.uname + 'token');
            setLoginState(true);
          } catch (e) {
            console.log('Token store issue: ' + e);
          }
        } else {
          showAlert();
        }
      } else {
        showAlert();
      }
    } catch (e) {
      // error reading value
      console.log('checking issue: ' + e);
    }
  };

  // This function is to show the alert dialog
  // about user credentials are not found
  const showAlert = () => {
    Alert.alert(
      'Login',
      credentials.email + ' not found you need to sing up first',
      [{text: 'OK'}],
    );
  };

  // onPress of sing up text
  const navigatToRegistration = () => {
    navigation.navigate('Registration');
  };

  // validation for password
  // using regular expression
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

  // validation for Email
  // using regular expression
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
        backgroundColor={Colors.secondaryTextColor}
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
              clearButtonMode="while-editing"
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
              clearButtonMode="while-editing"
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
