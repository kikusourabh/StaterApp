import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View} from 'react-native-animatable';
import {ActivityIndicator} from 'react-native';
import Home from '../screens/Home';
import AuthNav from './AuthNav';

function MainNav() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
        setIsLoading(false);
      } catch (e) {
        console.log('Token store issue: ' + e);
      }
    };
    check();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  } else {
    if (isLogin) {
      return <Home />;
    } else {
      return <AuthNav />;
    }
  }
}

export default MainNav;
