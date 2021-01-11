import color from 'color';
import React, {useCallback, useState} from 'react';
import {Animated, View} from 'react-native';
import {DummyImage} from '../../assets/Dummy';
import Colors from '../../style/Colors';
import ComponentStyles from '../../style/CommonStyles';
import {BORDER_RADIUS, SCREEN_WIDTH} from '../../style/Dimensions';
const IMAGE_SIZE = SCREEN_WIDTH * 0.7;

const Neumorphism = ({children}) => (
  <View
    style={{
      borderRadius: 10,
      shadowOffset: {
        width: -10,
        height: -10,
      },
      shadowOpacity: 1,
      shadowRadius: 7,
      shadowColor: color(Colors.primary.white)
        .darken(0.5)
        .alpha(0.4)
        .toString(),
    }}>
    <View
      style={{
        borderRadius: 10,
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 7,
        shadowColor: color(Colors.primary.dark)
          .lighten(0.5)
          .alpha(0.4)
          .toString(),
      }}>
      {children}
    </View>
  </View>
);

export default function Card2() {
  const [scrollX] = useState(new Animated.Value(0));

  const renderItem = useCallback(
    ({item, index}) => {
      const inputRange = [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ];
      const outputRange = [-IMAGE_SIZE, 0, IMAGE_SIZE];
      const translateX = scrollX.interpolate({inputRange, outputRange});

      return (
        <View
          style={[
            {flex: 1, width: SCREEN_WIDTH},
            ComponentStyles.parentCenter,
          ]}>
          <Neumorphism>
            <View
              style={{
                borderColor: '#545454',
                borderRadius: BORDER_RADIUS * 2,
                borderWidth: 10,
              }}>
              <View
                style={{
                  borderRadius: BORDER_RADIUS,
                  width: IMAGE_SIZE,
                  height: (IMAGE_SIZE * 16) / 9,
                  alignItems: 'center',
                  overflow: 'hidden',
                }}>
                <Animated.Image
                  source={item.source}
                  resizeMode="cover"
                  style={{
                    transform: [{translateX}],
                    width: SCREEN_WIDTH,
                    height: (IMAGE_SIZE * 16) / 9,
                  }}
                />
              </View>
            </View>
          </Neumorphism>
        </View>
      );
    },
    [scrollX],
  );

  return (
    <View style={{flex: 1, backgroundColor: '#545454'}}>
      <Animated.FlatList
        scrollEventThrottle={16}
        data={DummyImage}
        style={{flex: 1}}
        keyExtractor={(item, index) => item.key + index}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
      />
    </View>
  );
}
