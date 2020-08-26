import React, {useState} from 'react';
import {View, Text, StatusBar, SafeAreaView, Image, Alert} from 'react-native';
import {Styles} from '../config/styles';
import {Colors} from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

// Register Component of MainNav stack navigation
function Register({navigation}) {
  // States for user name, email and password
  // are valid or not
  const [isValid, setIsValid] = useState({
    uname: true,
    email: true,
    pass: true,
  });

  // State to store all the details of user
  const [credentials, setCredentials] = useState({});

  // This function is for checking the user details
  // are correctly entrer then check the user is alredy exist or not
  const CheckCredentials = () => {
    if (isValid.uname && isValid.email && isValid.pass) {
      checkUserExist(credentials.uname, credentials.email);
    }
  };

  // check the user is alredy exist or not
  const checkUserExist = async (username, useremail) => {
    try {
      const uname = await AsyncStorage.getItem('uname');
      const email = await AsyncStorage.getItem('email');
      if (uname != null && email != null) {
        let user = {uname: false, email: false};
        if (uname == username) {
          user.uname = true;
        }
        if (email == useremail) {
          user.email = true;
        }

        if (user.uname && user.email) {
          Alert.alert(
            'Login',
            username +
              ',' +
              useremail +
              ' are already there you need to login with these credentials',
            [{text: 'OK'}],
          );
        } else if (user.uname) {
          Alert.alert(
            'Login',
            username + ' is already there you need to try different user name',
            [{text: 'OK'}],
          );
        } else if (user.email) {
          Alert.alert(
            'Login',
            useremail + ' is already there you need to try different email',
            [{text: 'OK'}],
          );
        } else {
          storeData();
        }
      } else {
        storeData();
      }
    } catch (e) {
      console.log('exception: ' + e);
    }
  };

  // store the user detail in asyncstorage
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('uname', credentials.uname);
      await AsyncStorage.setItem('email', credentials.email);
      await AsyncStorage.setItem('pass', credentials.pass);
      navigation.navigate('Login');
    } catch (e) {
      console.log('exception: ' + e);
    }
  };

  // onPress of Login text
  const navigatToRegistration = () => {
    navigation.navigate('Login');
  };

  // validation of password
  const checkPassword = (text) => {
    if (
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        text,
      )
    ) {
      setCredentials({
        uname: credentials.uname,
        email: credentials.email,
        pass: text,
      });
      setIsValid({uname: isValid.uname, email: isValid.email, pass: true});
    } else {
      setIsValid({uname: isValid.uname, email: isValid.email, pass: false});
    }
  };

  // validation of email
  const checkEmail = (text) => {
    if (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(text)) {
      setIsValid({uname: isValid.uname, email: true, pass: isValid.pass});
      setCredentials({
        uname: credentials.uname,
        email: text,
        pass: credentials.pass,
      });
    } else {
      setIsValid({uname: isValid.uname, email: false, pass: isValid.pass});
    }
  };

  // validation of user name
  const checkUname = (text) => {
    if (/^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*.{8,}$/.test(text)) {
      setIsValid({uname: true, email: isValid.email, pass: isValid.pass});
      setCredentials({
        uname: text,
        email: credentials.email,
        pass: credentials.pass,
      });
    } else {
      setIsValid({uname: false, email: isValid.email, pass: isValid.pass});
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
              Sign up for your account
            </Text>
          </View>
        </View>
        <View style={Styles.FotterView}>
          <View style={Styles.Card}>
            <Icon
              name="person"
              size={30}
              style={Styles.IconStyle}
              color={Colors.white}
            />
            <TextInput
              placeholder="user name"
              style={Styles.InputStyle}
              placeholderTextColor={Colors.primaryTextColor}
              keyboardType="default"
              autoCompleteType="name"
              clearButtonMode="while-editing"
              onChangeText={(e) => checkUname(e)}
            />
          </View>
          {isValid.uname ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={Styles.ErrorMsg}>uname is not valid</Text>
            </Animatable.View>
          )}
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
              clearButtonMode="while-editing"
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
              <Text style={[Styles.Header_Text, Styles.ButtonText]}>
                Sign up
              </Text>
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
              Already have a account?
            </Text>
            <Text
              onPress={navigatToRegistration}
              style={[Styles.Header_Text, {color: Colors.primaryDarkColor}]}>
              {' '}
              Login
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Register;
