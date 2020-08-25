import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View} from 'react-native-animatable';
import {ActivityIndicator} from 'react-native';
import Home from '../screens/Home';
import {AuthContext} from '../components/context';
import Login from '../screens/Login';
import Register from '../screens/Register';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
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

  const loginState = React.useMemo(() => ({
    setLoginState: (isCorrect) => {
      if (isCorrect) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    },
  }));

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={loginState}>
      <NavigationContainer>
        {isLogin == true ? (
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen
              name="Registration"
              component={Register}></Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default MainNav;
