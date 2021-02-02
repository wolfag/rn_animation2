import React, {Component} from 'react';

import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import img from '../../assets/images/1.jpg';
import NumberChange from './NumberChange';
import Heart from './Heart';

const {width} = Dimensions.get('screen');

let startCount = 1;

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

export default class GetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {score: 0, hearts: []};
    this.animationScale = new Animated.Value(1);
  }
  state = {scaleDown: false, scaleUp: false};

  onPressIn = () => {
    Animated.timing(this.animationScale, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  onPressOut = () => {
    Animated.timing(this.animationScale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(this.adddHeart);
  };

  adddHeart = () => {
    const {hearts, score} = this.state;
    startCount += 1;
    this.setState({
      score: score + 1,
      hearts: [...hearts, {id: startCount, right: getRandomNumber(50, 150)}],
    });
  };

  removeHeart = (id) => {
    const {hearts} = this.state;
    const index = hearts.findIndex((item) => item.id === id);
    hearts.splice(index, 1);
    this.setState({hearts});
  };

  render() {
    const {score, hearts} = this.state;
    const transformStyle = {
      transform: [{scale: this.animationScale}],
    };

    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <View
          style={{
            flex: 1,
            width,
            justifyContent: 'flex-end',
          }}>
          <View>
            {hearts.map((v, i) => (
              <Heart
                key={v.id}
                onComplete={() => this.removeHeart(v.id)}
                style={{right: v.right}}
              />
            ))}
          </View>
        </View>
        <View>
          <NumberChange data={score} />
        </View>
        <TouchableWithoutFeedback
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}>
          <Animated.Image
            source={img}
            style={[{width: 300, height: 200}, transformStyle]}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
