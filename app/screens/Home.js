import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar, Platform} from 'react-native';
import {Styles} from '../config/styles';
import {Colors} from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../components/context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import QuoteListTab from './QuoteListTab';
import CategoryQuotesTab from './CategoryQuotesTab';

const Tab = createBottomTabNavigator();
function Home() {
  const [uname, setUname] = useState('');
  const {setLogOutState} = React.useContext(AuthContext);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setLogOutState();
    } catch (e) {
      console.log('exception-logut: ' + e);
    }
  };
  useEffect(() => {
    const getUname = async () => {
      try {
        const uname = await AsyncStorage.getItem('uname');
        if (uname != null) {
          setUname(uname);
        } else {
          setUname('no-username');
        }
      } catch (e) {
        console.log('====================================');
        console.log('error' + e);
        console.log('====================================');
        setUname('no-username');
      }
    };

    getUname();
  }, []);

  return (
    <View style={Styles.Window_Background}>
      <StatusBar
        backgroundColor={
          Platform.OS === 'android'
            ? Colors.primaryDarkColor
            : Colors.Window_Background
        }
        barStyle="light-content"
      />
      {/* action bar */}
      <View style={styles.ActionBar}>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
          }}>
          <Icon name="person" size={20} color={Colors.white} />
          <Text style={[Styles.Header_Text, styles.ActionTitle]}>{uname}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity onPress={logout}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              name="exit-to-app"
              size={20}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          padding: 20,
        }}>
        {/* body */}
        <Tab.Navigator>
          <Tab.Screen name="Quotes" component={QuoteListTab} />
          <Tab.Screen name="Category Quotes" component={CategoryQuotesTab} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: Platform.OS === 'ios' ? 35 : 0,
    height: Platform.OS === 'ios' ? 100 : 56,
    backgroundColor: Colors.primaryColor,
  },
  ActionTitle: {
    marginStart: 16,
  },
});
export default Home;
