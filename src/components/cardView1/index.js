import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {Animated, FlatList, Image, Pressable, View} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {SharedElement} from 'react-native-shared-element';
import Feather from 'react-native-vector-icons/Feather';

import {DummyImage} from '../../assets/Dummy';
import Colors from '../../style/Colors';
import {SCREEN_WIDTH} from '../../style/Dimensions';

const IMG_W = SCREEN_WIDTH / 1.4;
const IMG_H = (IMG_W * 16) / 9;
const ITEM_VISIBLE = 5;

export default function CardView1() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animated] = useState(new Animated.Value(0));
  const [activeAnimated] = useState(new Animated.Value(0));

  const [arrowAnimated] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animated, {
      toValue: activeAnimated,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [activeAnimated, animated]);

  const setCardActive = useCallback(
    (index) => {
      setActiveIndex(index);
      activeAnimated.setValue(index);
    },
    [setActiveIndex, activeAnimated],
  );

  const renderItem = useCallback(
    ({item, index}) => {
      const inputRange = [index - 1, index, index + 1];
      const translateY = animated.interpolate({
        inputRange,
        outputRange: [-25, 0, 25],
      });
      const opacity = animated.interpolate({
        inputRange,
        outputRange: [1 - 1 / ITEM_VISIBLE, 1, 0],
      });
      const scale = animated.interpolate({
        inputRange,
        outputRange: [0.96, 1, 1.3],
      });
      const style = {
        top: -IMG_H / 2,
        left: -IMG_W / 2,
      };

      return (
        <Animated.View
          style={[
            {position: 'absolute', opacity, transform: [{translateY}, {scale}]},
            style,
          ]}>
          <Pressable>
            <SharedElement
              id={`item.${item.key}.image`}
              style={{
                borderRadius: 20,
                width: IMG_W,
                height: IMG_H,
              }}>
              <Image
                source={item.source}
                style={{borderRadius: 20, width: IMG_W, height: IMG_H}}
              />
            </SharedElement>
          </Pressable>
        </Animated.View>
      );
    },
    [animated],
  );

  const renderCenter = useCallback(
    ({style, item, index, children, ...rest}) => {
      return (
        <View style={[{zIndex: DummyImage.length - index}, style]} {...rest}>
          {children}
        </View>
      );
    },
    [],
  );

  const backgroundColor = useMemo(() => {
    return animated.interpolate({
      inputRange: DummyImage.map((_, index) => index),
      outputRange: DummyImage.map((item) => item.color),
    });
  }, [animated]);

  const handleUp = useCallback(
    (e) => {
      if (
        e.nativeEvent.state === State.END &&
        activeIndex !== DummyImage.length - 1
      ) {
        setCardActive(activeIndex + 1);
      }
    },
    [activeIndex, setCardActive],
  );

  const handleDown = useCallback(
    (e) => {
      if (e.nativeEvent.state === State.END && activeIndex !== 0) {
        setCardActive(activeIndex - 1);
      }
    },
    [activeIndex, setCardActive],
  );

  return (
    <View style={{flex: 1}}>
      <FlingGestureHandler
        key="UP"
        direction={Directions.UP}
        onHandlerStateChange={handleUp}>
        <FlingGestureHandler
          key="DOWN"
          direction={Directions.DOWN}
          onHandlerStateChange={handleDown}>
          <View style={{flex: 1, backgroundColor: Colors.primary.dark}}>
            <Animated.View
              style={{
                flex: 1,
                backgroundColor,
              }}>
              <FlatList
                data={DummyImage}
                keyExtractor={(item, index) => item + index}
                scrollEnabled={false}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                renderItem={renderItem}
                CellRendererComponent={renderCenter}
              />
            </Animated.View>
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
      <View
        style={{
          position: 'absolute',
          right: 5,
          top: 0,
          bottom: 0,
          justifyContent: 'center',
        }}>
        <Feather name="arrow-up" size={50} />
        <Feather name="arrow-down" size={50} />
      </View>
    </View>
  );
}
