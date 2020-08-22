import {StyleSheet} from 'react-native';
import {Colors} from './colors';

export const Styles = StyleSheet.create({
  Header_Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryTextColor,
  },
  Norm_Text_Primary: {
    fontSize: 16,
    fontWeight: 'normal',
    color: Colors.primaryTextColor,
  },
  Norm_Text_Secondary: {
    fontSize: 16,
    fontWeight: 'normal',
    color: Colors.secondaryDarkColor,
  },
  Sub_Header_Text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryTextColor,
  },
  Window_Background: {
    flex: 1,
    backgroundColor: Colors.secondaryTextColor,
  },
});
