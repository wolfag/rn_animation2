import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const ratioImage = 2.4;

// develop on iPhone 11
const BASE_WIDTH = 414;
const BASE_HEIGHT = 896;

const wRatio = SCREEN_WIDTH / BASE_WIDTH;
const hRatio = SCREEN_HEIGHT / BASE_HEIGHT;

const xScale = (size, base, ratio, minFactor) => {
  const minSize = size * minFactor;
  const scaleSize = wp(((100 * size) / base) * ratio);
  return Math.floor(scaleSize > minSize ? scaleSize : minSize);
};

export const wScale = (size, minFactor = 0.9) => {
  return xScale(size, BASE_WIDTH, wRatio, minFactor);
};
export const hScale = (size, minFactor = 0.9) => {
  return xScale(size, BASE_HEIGHT, hRatio, minFactor);
};

export const fontScale = (size) => {
  const minSize = size * 0.95;
  const scaleSize = size * wRatio;
  return Math.floor(scaleSize > minSize ? scaleSize : minSize);
};

export const MARGIN = 20;
export const MARGIN_hScale = hScale(MARGIN);
export const MARGIN_wScale = wScale(MARGIN);

export const BORDER_RADIUS = 10;
export const BUTTON_HEIGHT = hScale(50, 0.95);

export const HEADER_HEIGHT = hScale(50, 0.95);
