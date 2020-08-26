import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Styles} from '../config/styles';
import Axios from 'react-native-axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../config/colors';
import Clipboard from '@react-native-community/clipboard';

function QuoteListTab() {
  const [data, setData] = useState([]);

  const copyQuote = (text) => {
    console.log('Copy:' + text);

    Clipboard.setString(text);
  };

  const QuotesItem = ({item}) => {
    return (
      <View style={styles.Item}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <Image style={styles.ItemImg} source={{uri: item.img}} />
          <Text numberOfLines={4} style={styles.ItemText}>
            {item.text}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.ItemCopy}
            onPress={() => copyQuote(item.text)}>
            <Icon name="content-copy" size={30} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const QuotesItemSeparator = () => {
    return <View style={styles.ItemSeparator}></View>;
  };
  useEffect(() => {
    const fetchData = async () => {
      Axios.get(
        'https://raw.githubusercontent.com/kikusourabh/QuotesStore/master/Quotes/QuotesList.json',
      )
        .then((res) => setData(res.data))
        .catch((err) => {
          console.log('error axios:' + err);
        });
    };
    fetchData();
  }, []);
  return (
    <View style={Styles.Window_Background}>
      <FlatList
        data={data}
        keyExtractor={({key}) => key.toString()}
        renderItem={QuotesItem}
        ItemSeparatorComponent={QuotesItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Item: {
    height: 100,
    backgroundColor: Colors.primaryLightColor,
    flexDirection: 'row',
  },
  ItemSeparator: {
    height: 8,
    backgroundColor: Colors.secondaryColor,
  },
  ItemImg: {
    height: 100,
    width: 100,
  },
  ItemText: {
    color: Colors.primaryTextColor,
    marginStart: 16,
    marginEnd: 8,
    width: 200,
    fontSize: 18,
    alignSelf: 'center',
  },
  ItemCopy: {},
});
export default QuoteListTab;
