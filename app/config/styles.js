import {StyleSheet} from 'react-native';
import {Colors} from './colors';

export const Styles = StyleSheet.create({
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
  IconStyle: {
    marginStart: 20,
    alignSelf: 'center',
    flex: 1,
  },
  InputStyle: {
    flex: 7,
    height: '100%',
    color: Colors.white,
    marginEnd: 8,
  },
  Button: {
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
  ButtonText: {
    color: Colors.white,
    fontSize: 18,
  },
  BottomTextContainer: {
    height: '30%',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  BottomText: {
    color: Colors.secondaryDarkColor,
    alignSelf: 'flex-end',
    marginTop: 20,
    fontStyle: 'italic',
  },
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
  FotterView: {
    flex: 2,
    justifyContent: 'center',
  },
  HeaderView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
