import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  PanResponder,
  TouchableOpacity,
  Animated,
} from 'react-native';

const images = [
  {id: 'like', img: 'http://i.imgur.com/LwCYmcM.gif'},
  {id: 'love', img: 'http://i.imgur.com/k5jMsaH.gif'},
  {id: 'haha', img: 'http://i.imgur.com/f93vCxM.gif'},
  {id: 'yay', img: 'http://i.imgur.com/a44ke8c.gif'},
  {id: 'wow', img: 'http://i.imgur.com/9xTkN93.gif'},
  {id: 'sad', img: 'http://i.imgur.com/tFOrN5d.gif'},
  {id: 'angry', img: 'http://i.imgur.com/1MgcQg0.gif'},
];

export default class FacebookReaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      open: false,
    };
    this._imgLayouts = {};
    this._imgAnimations = {};
    this._hoveredImg = '';
    this._scaleAnimation = new Animated.Value(0);

    images.forEach((img) => {
      this._imgAnimations[img.id] = {
        position: new Animated.Value(55),
        scale: new Animated.Value(1),
      };
    });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, getSelection) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: this.onOpen,
      onPanResponderMove: (evt, gestureState) => {
        const hoveredImg = this.getHoveredImg(
          Math.ceil(evt.nativeEvent.locationX),
        );
        if (hoveredImg && this._hoveredImg !== hoveredImg) {
          this.animateSelected(this._imgAnimations[hoveredImg]);
        }
        if (this._hoveredImg !== hoveredImg && this._hoveredImg) {
          this.animateFromSelect(this._imgAnimations[this._hoveredImg]);
        }

        this._hoveredImg = hoveredImg;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this._hoveredImg) {
          this.animateFromSelect(
            this._imgAnimations[this._hoveredImg],
            this.onClose(this.afterClose),
          );
        } else {
          this.onClose(this.afterClose);
        }
      },
    });
  }

  getImageAnimationArray = (toValue) => {
    return images.map((img) => {
      return Animated.timing(this._imgAnimations[img.id].position, {
        duration: 200,
        toValue,
        useNativeDriver: true,
      });
    });
  };

  onOpen = () => {
    Animated.parallel([
      Animated.timing(this._scaleAnimation, {
        duration: 100,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.stagger(50, this.getImageAnimationArray(0)),
    ]).start(() => this.setState({open: true}));
  };

  onClose = (cb) => {
    this.setState({open: false}, () => {
      Animated.stagger(100, [
        Animated.parallel(this.getImageAnimationArray(55).reverse()),
        Animated.timing(this._scaleAnimation, {
          duration: 100,
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start(cb);
    });
  };

  afterClose = () => {
    if (this._hoveredImg) {
      this.setState({
        selected: this._hoveredImg,
      });
    }
    this._hoveredImg = '';
  };

  animateSelected = (img) => {
    Animated.parallel([
      Animated.timing(img.position, {
        duration: 150,
        toValue: -30,
        useNativeDriver: true,
      }),
      Animated.timing(img.scale, {
        duration: 150,
        toValue: 1.8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  animateFromSelect = (img, cb) => {
    Animated.parallel([
      Animated.timing(img.position, {
        duration: 50,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(img.scale, {
        duration: 50,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(cb);
  };

  getHoveredImg = (x) => {
    return Object.keys(this._imgLayouts).find(
      (key) =>
        x >= this._imgLayouts[key].left && x <= this._imgLayouts[key].right,
    );
  };

  likeContainerStyle = () => {
    return {
      transform: [{scaleY: this._scaleAnimation}],
      overflow: this.state.open ? 'visible' : 'hidden',
    };
  };

  handleLayoutPosition = (img, position) => {
    this._imgLayouts[img] = {
      left: position.nativeEvent.layout.x,
      right: position.nativeEvent.layout.x + position.nativeEvent.layout.width,
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.center} {...this._panResponder.panHandlers}>
          <Text>Like</Text>
          <Text>Your selected: {this.state.selected}</Text>

          <Animated.View
            style={[styles.likeContainer, this.likeContainerStyle()]}>
            <View style={styles.borderContainer} />
            <View style={styles.imgContainer}>
              {images.map((img) => {
                return (
                  <Animated.Image
                    onLayout={(evt) => {
                      this.handleLayoutPosition(img.id, evt);
                    }}
                    key={img.id}
                    source={{uri: img.img}}
                    style={styles.img}
                    style={[
                      styles.img,
                      {
                        transform: [
                          {
                            scale: this._imgAnimations[img.id]?.scale,
                          },
                          {
                            translateY: this._imgAnimations[img.id]?.position,
                          },
                        ],
                      },
                    ]}
                  />
                );
              })}
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    position: 'absolute',
    left: 50,
    top: 300,
  },
  likeContainer: {
    position: 'absolute',
    left: -10,
    top: -30,
    padding: 5,
    flex: 1,
    backgroundColor: '#FFF',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 20,
  },
  borderContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 20,
  },
  imgContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  img: {
    marginLeft: 5,
    marginRight: 5,
    width: 30,
    height: 30,
    overflow: 'visible',
  },
});
