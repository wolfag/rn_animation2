import React, {PureComponent} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';

const {width, height} = Dimensions.get('screen');

const EndY = Math.ceil(height * 0.5);
const NegativeEndY = EndY * -1;

class Heart extends PureComponent {
  constructor(props) {
    super(props);

    this.positionAnimate = new Animated.Value(0);
  }

  componentDidMount() {
    const {onComplete} = this.props;
    Animated.timing(this.positionAnimate, {
      toValue: NegativeEndY,
      duration: 2000,
      useNativeDriver: false,
    }).start(onComplete);
  }

  render() {
    const {style} = this.props;
    const yAnimation = this.positionAnimate.interpolate({
      inputRange: [NegativeEndY, 0],
      outputRange: [EndY, 0],
    });
    const opacity = yAnimation.interpolate({
      inputRange: [0, EndY],
      outputRange: [1, 0],
    });
    const scale = yAnimation.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [0, 1.2, 1],
      extrapolate: 'clamp',
    });

    const xAnimation = yAnimation.interpolate({
      inputRange: [0, EndY / 2, EndY],
      outputRange: [0, 15, 0],
    });

    const rotate = yAnimation.interpolate({
      inputRange: [0, EndY / 4, EndY / 3, EndY / 2, EndY],
      outputRange: ['0deg', '-20deg', '0deg', '20deg', '0deg'],
    });

    const styleAnimate = {
      transform: [
        {
          translateY: this.positionAnimate,
        },
        {
          translateX: xAnimation,
        },
        {
          scale,
        },
        {
          rotate,
        },
      ],
      opacity,
    };

    return (
      <View styles={styles.container}>
        <Animated.View style={[styles.heartWrap, styleAnimate, style]}>
          <View style={[styles.heart]}>
            <View style={[styles.leftHeart, styles.heartShape]} />
            <View style={[styles.rightHeart, styles.heartShape]} />
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default Heart;

const styles = StyleSheet.create({
  heart: {
    width: 50,
    height: 50,
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#6427d1',
  },
  leftHeart: {
    transform: [{rotate: '-45deg'}],
    left: 5,
  },
  rightHeart: {
    transform: [{rotate: '45deg'}],
    right: 5,
  },
  heartWrap: {
    position: 'absolute',
    bottom: 50,
    // right: width / 2 - 25,
  },
  container: {
    flex: 1,
  },
});
