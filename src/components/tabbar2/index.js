import React, {useState} from 'react';
import {View, Text, Animated, Pressable} from 'react-native';
import Circle from './Circle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {wScale, SCREEN_WIDTH} from '../../style/Dimensions';
import Colors from '../../style/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';

const SIZE_CIRCLE = wScale(70);
const HEIGHT_TABBAR = SIZE_CIRCLE * 0.7;
const WIDTH_TABBAR = SCREEN_WIDTH * 0.8;
const ICON_SIZE = wScale(26);

export default function Tabbar2() {
  const [animate] = useState(new Animated.Value(0));
  const [animateIcon] = useState(new Animated.Value(0));
  const [isShowIcon, setIsShowIcon] = useState(false);

  const onClick = () => {
    Animated.parallel([
      Animated.timing(animateIcon, {
        toValue: isShowIcon ? 0 : 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animate, {
        toValue: isShowIcon ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => setIsShowIcon(!isShowIcon));
  };

  const renderTabbar = () => {
    const scaleX = animate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const opacity = animateIcon.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const scale = animateIcon.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const opacity2 = animateIcon.interpolate({
      inputRange: [0.8, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const scale2 = animateIcon.interpolate({
      inputRange: [0.8, 1],
      outputRange: [0.5, 1],
      extrapolate: 'clamp',
    });

    return (
      <View
        style={{
          height: SIZE_CIRCLE,
          width: SCREEN_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            width: WIDTH_TABBAR,
            backgroundColor: Colors.red.general,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: HEIGHT_TABBAR,
            borderRadius: HEIGHT_TABBAR / 2,
            transform: [{scaleX}],
          }}>
          <Animated.View style={{opacity, transform: [{scale: scale2}]}}>
            <FontAwesome name="heart" color="#fff" size={ICON_SIZE} />
          </Animated.View>
          <Animated.View
            style={{
              opacity,
              transform: [{scale}],
            }}>
            <Ionicons
              name={'md-chatbubble-sharp'}
              color={'#fff'}
              size={ICON_SIZE}
            />
          </Animated.View>
          <View style={{width: SIZE_CIRCLE, height: HEIGHT_TABBAR}} />
          <Animated.View style={{opacity, transform: [{scale}]}}>
            <Entypo name={'arrow-bold-down'} color={'#fff'} size={ICON_SIZE} />
          </Animated.View>
          <Animated.View
            style={{opacity: opacity2, transform: [{scale: scale2}]}}>
            <Entypo name={'share'} color={'#fff'} size={ICON_SIZE} />
          </Animated.View>
        </Animated.View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              width: SIZE_CIRCLE,
              height: SIZE_CIRCLE,
              borderRadius: SIZE_CIRCLE / 2,
              backgroundColor: Colors.red.general,
              shadowRadius: 4,
              shadowColor: Colors.red.dark,
              shadowOpacity: 0.8,
              shadowOffset: {width: 0, height: 4},
              elevation: 6,
            }}
            onPress={onClick}>
            <Circle size={SIZE_CIRCLE} animated={animate} />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <Animated.View style={{flex: 1, backgroundColor: Colors.primary.white}}>
      <SafeAreaView style={{backgroundColor: Colors.yellow.general, flex: 1}}>
        <View style={{flex: 1}} />
        {renderTabbar()}
      </SafeAreaView>
    </Animated.View>
  );
}
