import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Styles} from '../config/styles';
import Axios from 'react-native-axios';
import {Colors} from '../config/colors';
import {FlatList} from 'react-native-gesture-handler';

function QuoteListTab() {
  const [data, setData] = useState([]);
  const QuotesItem = ({item}) => {
    return (
      <View style={styles.Item}>
        <Image style={styles.ItemImg} source={{uri: item.img}} />
      </View>
    );
  };
  const QuotesItemSeparator = () => {
    return <View style={styles.ItemSeparator}></View>;
  };
  useEffect(() => {
    Axios.get(
      'https://github.com/kikusourabh/StaterApp/blob/home-flatlist/Quotes/QuotesList.json',
    )
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log('error axios:' + err);
      });
  });
  return (
    <View style={Styles.Window_Background}>
      {console.log('data-flat: ' + data)}
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
    height: 56,
    backgroundColor: Colors.primaryLightColor,
  },
  ItemSeparator: {
    height: 8,
    backgroundColor: Colors.secondaryColor,
  },
  ItemImg: {
    height: 56,
    width: 56,
  },
});
export default QuoteListTab;
