import React from 'react';
import {Animated, View} from 'react-native';

const DOT_SIZE = 5;

const Dot = () => (
  <View
    style={{
      height: DOT_SIZE,
      borderRadius: DOT_SIZE / 2,
      backgroundColor: '#fff',
    }}
  />
);

export default function Circle({size = 100, animated = new Animated.Value(0)}) {
  const widthLine = size * 0.4;
  const width = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [DOT_SIZE, widthLine],
  });

  const translateX0 = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [-DOT_SIZE * 2, 0],
  });

  const rotate0 = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'],
  });

  const translateX1 = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [DOT_SIZE * 2, 0],
  });

  const rotate1 = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-135deg'],
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{rotate: rotate0}, {translateX: translateX0}],
        }}>
        <Animated.View style={{width}}>
          <Dot />
        </Animated.View>
      </Animated.View>
      <View
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          position: 'absolute',
          borderRadius: DOT_SIZE / 2,
          backgroundColor: '#fff',
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            {
              rotate: rotate1,
            },
            {
              translateX: translateX1,
            },
          ],
        }}>
        <Animated.View style={{width}}>
          <Dot />
        </Animated.View>
      </Animated.View>
    </View>
  );
}
