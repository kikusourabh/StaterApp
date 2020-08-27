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

  const QuotesItemSeparator = () => {
    return <View style={Styles.ItemSeparator} />;
  };
  const QuotesItem = ({item}) => {
    return (
      <View style={Styles.Item}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <Image style={Styles.ItemImg} source={{uri: item.img}} />
          <Text numberOfLines={4} style={Styles.ItemText}>
            {item.text}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => copyQuote(item.text)}>
            <Icon name="content-copy" size={30} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
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
export default QuoteListTab;
