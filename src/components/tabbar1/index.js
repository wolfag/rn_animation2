import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Animated, Pressable, FlatList} from 'react-native';
import Colors from '../../style/Colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {wScale, hScale, HEADER_HEIGHT, fontScale} from '../../style/Dimensions';
import CommonStyles from '../../style/CommonStyles';

const ICON_SIZE = wScale(24);
const listTab = [
  {
    key: 'Home',
    color: Colors.accent.general,
    bk: Colors.accent.extraLight,
    Icon: ({color}) => (
      <Fontisto name={'home'} color={color} size={ICON_SIZE} />
    ),
  },
  {
    key: 'Like',
    color: Colors.red.general,
    bk: Colors.red.extraLight,
    Icon: ({color}) => (
      <FontAwesome name={'heart'} color={color} size={ICON_SIZE} />
    ),
  },
  {
    key: 'Chat',
    color: Colors.green.dark,
    bk: Colors.green.extraLight,
    Icon: ({color}) => (
      <Ionicons name={'md-chatbubble-sharp'} color={color} size={ICON_SIZE} />
    ),
  },
  {
    key: 'Setting',
    color: Colors.blue.dark,
    bk: Colors.blue.extraLight,
    Icon: ({color}) => (
      <Ionicons name={'settings'} color={color} size={ICON_SIZE} />
    ),
  },
];

export default function Tabbar1() {
  const [indexSelected, setIndexSelected] = useState(0);
  const [animate] = useState(new Animated.Value(0));
  const [actionAnimate] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animate, {
      toValue: actionAnimate,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [animate, actionAnimate]);

  const onChangeTab = useCallback(
    (index) => {
      setIndexSelected(index);
      actionAnimate.setValue(index);
    },
    [actionAnimate],
  );

  const renderItem = useCallback(
    ({item, index}) => {
      const {Icon} = item;
      const inputRange = [index - 1, index, index + 1];
      const width = animate.interpolate({
        inputRange,
        outputRange: [0, wScale(80), 0],
      });
      const bkColor = animate.interpolate({
        inputRange,
        outputRange: ['#fff', item.bk, '#fff'],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          style={[
            {
              height: HEADER_HEIGHT,
              borderRadius: HEADER_HEIGHT / 2,
              backgroundColor: bkColor,
            },
            CommonStyles.parentCenter,
          ]}>
          <Pressable
            onPress={() => onChangeTab(index)}
            hitSlop={{top: 10, left: 15, bottom: 10, right: 15}}
            style={{marginHorizontal: wScale(15), flexDirection: 'row'}}>
            {Icon({
              color: indexSelected === index ? item.color : Colors.grey.dark,
            })}
            <Animated.View style={{overflow: 'hidden', width}}>
              {indexSelected === index && (
                <Text
                  style={{
                    textAlign: 'center',
                    width: wScale(70),
                    color: item.color,
                    fontSize: fontScale(18),
                  }}>
                  {item.key}
                </Text>
              )}
            </Animated.View>
          </Pressable>
        </Animated.View>
      );
    },
    [animate, onChangeTab, indexSelected],
  );

  const backgroundColor = animate.interpolate({
    inputRange: listTab.map((_, index) => index),
    outputRange: listTab.map((item) => item.color),
  });

  return (
    <Animated.View style={{flex: 1, backgroundColor}}>
      <Pressable></Pressable>
      <View style={{flex: 1}} />

      <View>
        <FlatList
          data={listTab}
          contentContainerStyle={{marginVertical: hScale(15)}}
          scrollEnabled={false}
          horizontal={true}
          renderItem={renderItem}
          extraData={indexSelected}
          keyExtractor={(item) => item.key}
        />
      </View>
    </Animated.View>
  );
}
