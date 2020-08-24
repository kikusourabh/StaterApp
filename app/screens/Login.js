import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
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
        <View style={styles.HeaderView}>
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
        <View style={styles.FotterView}>
          <View style={styles.Card}>
            <Icon
              name="email"
              size={30}
              style={styles.IconStyle}
              color={Colors.white}
            />
            <TextInput
              placeholder="Email"
              style={styles.InputStyle}
              placeholderTextColor={Colors.primaryTextColor}
              keyboardType="email-address"
              autoCompleteType="email"
              onChangeText={(e) => checkEmail(e)}
            />
          </View>
          {isValid.email ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.ErrorMsg}>Email is not valid</Text>
            </Animatable.View>
          )}

          <View style={styles.Card}>
            <Icon
              name="lock"
              size={30}
              style={styles.IconStyle}
              color={Colors.white}
            />
            <TextInput
              placeholder="Password"
              style={styles.InputStyle}
              placeholderTextColor={Colors.primaryTextColor}
              secureTextEntry={true}
              autoCompleteType="password"
              onChangeText={(e) => checkPassword(e)}
            />
          </View>
          {isValid.pass ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.ErrorMsg}>Password is not valid</Text>
            </Animatable.View>
          )}

          <TouchableOpacity onPress={CheckCredentials}>
            <View style={styles.LoginButton}>
              <Text style={[Styles.Header_Text, styles.LoginButtonText]}>
                Login
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.SignUpText}>
            <Text
              style={[
                Styles.Header_Text,
                styles.ForgotPassStyle,
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
              Sign up. it's free
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Card: {
    backgroundColor: Colors.secondaryDarkColor,
    width: '100%',
    height: 56,
    borderRadius: 56 / 2,
    shadowRadius: 20,
    shadowColor: Colors.white,
    shadowOpacity: 1,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    marginTop: 10,
    flexDirection: 'row',
  },
  ErrorMsg: {
    color: Colors.error,
    marginStart: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  FotterView: {
    flex: 2,
    justifyContent: 'center',
  },
  ForgotPassStyle: {
    color: Colors.secondaryDarkColor,
    alignSelf: 'flex-end',
    marginTop: 20,
    fontStyle: 'italic',
  },
  HeaderView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  IconStyle: {
    marginStart: 20,
    alignSelf: 'center',
    flex: 1,
  },
  InputStyle: {
    flex: 7,
    height: '100%',
    color: Colors.white,
  },
  LoginButton: {
    height: 56,
    marginTop: 30,
    width: '50%',
    borderRadius: 56 / 2,
    shadowRadius: 5,
    shadowColor: Colors.primaryDarkColor,
    shadowOpacity: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryDarkColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  LoginButtonText: {
    color: Colors.white,
    fontSize: 18,
  },
  SignUpText: {
    height: '30%',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});
export default Login;
