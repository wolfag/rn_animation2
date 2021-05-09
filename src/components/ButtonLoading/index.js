import React from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const ACTION_TIMER = 400;
const COLORS = ['rgb(255,255,255)', 'rgb(111,235,62)'];

export default class ButtonLoading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textComplete: '',
      buttonWidth: 0,
      buttonHeight: 0,
    };

    this.pressAction = new Animated.Value(0);
    this._value = 0;
    this.pressAction.addListener((v) => (this._value = v.value));
  }

  handlePressIn = () => {
    Animated.timing(this.pressAction, {
      duration: ACTION_TIMER,
      toValue: 1,
      useNativeDriver: false,
    }).start(this.animationActionComplete);
  };

  handlePressOut = () => {
    Animated.timing(this.pressAction, {
      duration: this._value * ACTION_TIMER,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  animationActionComplete = () => {
    let msg = '';
    if (this._value === 1) {
      msg = 'You help it long enough to fire the action';
    }
    this.setState({
      textComplete: msg,
    });
  };

  getButtonWidthLayout = (e) => {
    this.setState({
      buttonHeight: e.nativeEvent.layout.height - 6,
      buttonWidth: e.nativeEvent.layout.width - 6,
    });
  };

  getProgressStyles = () => {
    const width = this.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.buttonWidth],
    });
    const bgColor = this.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS,
    });
    console.log({width});
    return {
      height: this.state.buttonHeight,
      width: this.state.buttonWidth,
      backgroundColor: bgColor,
      transform: [{scaleX: width}],
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}>
          <View style={styles.button} onLayout={this.getButtonWidthLayout}>
            <Animated.View style={[styles.bgFill, this.getProgressStyles()]} />
            <Text>Press and hold me</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text>{this.state.textComplete}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderWidth: 3,
    borderColor: '#111',
  },
  text: {
    backgroundColor: 'transparent',
    color: '#111',
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
