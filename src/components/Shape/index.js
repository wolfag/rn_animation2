import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Divider = ({height = 20}) => <View style={{height}} />;

const Triangle = ({style, color = 'red'}) => {
  return (
    <View
      style={[
        {
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: 50,
          borderRightWidth: 50,
          borderBottomWidth: 100,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
        },
        style,
      ]}
    />
  );
};

const TriangleUp = ({style, color}) => <Triangle style={style} color={color} />;
const TriangleDown = ({style, color}) => (
  <Triangle style={[style, {transform: [{rotate: '180deg'}]}]} color={color} />
);
const TriangleLeft = ({style, color}) => (
  <Triangle style={[style, {transform: [{rotate: '-90deg'}]}]} color={color} />
);
const TriangleRight = ({style, color}) => (
  <Triangle style={[style, {transform: [{rotate: '90deg'}]}]} color={color} />
);

const TriangleCorner = () => (
  <View
    style={{
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderRightWidth: 100,
      borderTopWidth: 100,
      borderRightColor: 'transparent',
      borderTopColor: 'red',
    }}
  />
);

const Trapezoid = () => (
  <View
    style={{
      width: 200,
      height: 0,
      borderBottomWidth: 100,
      borderBottomColor: 'red',
      borderLeftWidth: 50,
      borderLeftColor: 'transparent',
      borderRightWidth: 50,
      borderRightColor: 'transparent',
      borderStyle: 'solid',
    }}
  />
);

const Parallelogram = ({color = 'red'}) => (
  <View
    style={{
      width: 200,
      height: 100,
      backgroundColor: 'pink',
    }}>
    <TriangleUp
      style={{
        top: 0,
        right: 0,
        position: 'absolute',
      }}
      color={color}
    />
    <View
      style={{
        position: 'absolute',
        left: 50,
        top: 0,
        backgroundColor: color,
        width: 100,
        height: 100,
      }}
    />
    <TriangleDown
      style={{
        top: 0,
        left: 0,
        position: 'absolute',
      }}
      color={color}
    />
  </View>
);

const StartSix = () => (
  <View style={{width: 100, height: 125, backgroundColor: 'pink'}}>
    <TriangleUp style={{position: 'absolute', top: 0}} />
    <TriangleDown style={{position: 'absolute', top: 25}} />
  </View>
);

const StartFive = () => (
  <View style={{width: 150, height: 150}}>
    <TriangleUp style={{position: 'absolute', top: -45, left: 37}} />
    <View
      style={{
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        top: 0,
        borderStyle: 'solid',
        borderRightWidth: 100,
        borderRightColor: 'transparent',
        borderBottomWidth: 70,
        borderBottomColor: 'red',
        borderLeftWidth: 100,
        borderLeftColor: 'transparent',
        transform: [{rotate: '35deg'}],
      }}
    />
    <View
      style={{
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: -25,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderRightWidth: 100,
        borderRightColor: 'transparent',
        borderBottomWidth: 70,
        borderBottomColor: 'red',
        borderLeftWidth: 100,
        borderLeftColor: 'transparent',
        transform: [{rotate: '-35deg'}],
      }}
    />
  </View>
);

export default function Shape() {
  return (
    <ScrollView>
      <Triangle color={'green'} />
      <Divider />
      <TriangleCorner />
      <Divider />
      <Trapezoid />
      <Divider />
      <Parallelogram color="green" />
      <Divider />
      <StartSix />
      <Divider height={50} />
      <StartFive />
    </ScrollView>
  );
}
