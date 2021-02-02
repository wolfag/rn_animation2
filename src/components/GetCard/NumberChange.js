import React, {PureComponent} from 'react';

import {Animated, Text, View} from 'react-native';

const fontSize = 60;
const EndY = fontSize;
const NegativeEndY = -1 * EndY;
const NormalColor = 'black';
const ChangeColor = 'red';

class NumberAnimate extends PureComponent {
  constructor(props) {
    super(props);
    this.animationValue = new Animated.Value(0);
    this.state = {
      color: NormalColor,
    };
  }

  componentDidMount() {
    const {onComplete} = this.props;
    this.setState({color: ChangeColor});
    Animated.timing(this.animationValue, {
      toValue: NegativeEndY,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      this.setState({color: NormalColor});
      onComplete && onComplete();
    });
  }

  render() {
    const {firstItem, secondItem, style} = this.props;
    const {color} = this.state;
    const styleAnimate = {
      transform: [{translateY: this.animationValue}],
    };
    return (
      <Animated.View style={[style, styleAnimate]}>
        <Text style={[{color, lineHeight: fontSize, fontSize}]}>
          {firstItem}
        </Text>
        <View style={{height: fontSize / 2}} />
        <Text style={[{color, lineHeight: fontSize, fontSize}]}>
          {secondItem}
        </Text>
      </Animated.View>
    );
  }
}

class SingleNumberChange extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      number: props.data,
      prevNumber: props.data,
      scroll: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {data} = this.props;
    const {data: prevData} = prevProps;
    if (data !== prevData) {
      this.setState({number: data, prevNumber: prevData, scroll: true});
    }
  }

  render() {
    const {number, prevNumber, scroll} = this.state;
    return (
      <View
        style={{
          borderWidth: 0,
          height: fontSize,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
        {scroll ? (
          <NumberAnimate
            firstItem={prevNumber}
            secondItem={number}
            style={{height: fontSize * 2}}
            onComplete={() => {
              this.setState({scroll: false});
            }}
          />
        ) : (
          <Text style={{fontSize, lineHeight: fontSize}}>{number}</Text>
        )}
      </View>
    );
  }
}

export default class NumberChange extends PureComponent {
  render() {
    const {data} = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {Number(data)
          .toLocaleString()
          .split('')
          .map((item, index) => {
            if (item !== ',') {
              return <SingleNumberChange key={index} data={item} />;
            }
            return (
              <Text style={{fontSize}} key={index}>
                ,
              </Text>
            );
          })}
      </View>
    );
  }
}
