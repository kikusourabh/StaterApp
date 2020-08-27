import React, {useEffect, useState} from 'react';
import {View} from 'react-native-animatable';
import {Styles} from '../config/styles';
import {Text, ActivityIndicator, SectionList, Image} from 'react-native';
import Axios from 'react-native-axios';
import {Colors} from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Clipboard from '@react-native-community/clipboard';

function CategoryQuotesTab() {
  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const QuotesItemSeparator = () => {
    return <View style={Styles.ItemSeparator} />;
  };

  // fetching the data using axios
  useEffect(() => {
    const fetchData = async () => {
      Axios.get(
        'https://raw.githubusercontent.com/kikusourabh/QuotesStore/master/Quotes/CategoryQuotes.json',
      )
        .then((res) => setData(res.data))
        .catch((err) => {
          console.log('error axios:' + err);
        })
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, []);

  const copyQuote = (text) => {
    console.log('Copy:' + text);

    Clipboard.setString(text);
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

  const QuotesItemHeader = ({section}) => {
    return (
      <View style={{padding: 10, backgroundColor: Colors.primaryTextColor}}>
        <Text style={[Styles.Header_Text, {color: Colors.primaryDarkColor}]}>
          {section.category}
        </Text>
      </View>
    );
  };
  return (
    <View style={Styles.Window_Background}>
      {isloading == true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
          <Text style={[Styles.Norm_Text_Secondary, {marginTop: 20}]}>
            Wait for a while quotes are loading..
          </Text>
        </View>
      ) : (
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={QuotesItem}
          ItemSeparatorComponent={QuotesItemSeparator}
          renderSectionHeader={QuotesItemHeader}
        />
      )}
    </View>
  );
}

export default CategoryQuotesTab;
