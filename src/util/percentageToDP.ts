import { Dimensions, PixelRatio } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const screenScale = Dimensions.get('window').scale;

const widthPercentageToDP = (widthPercent: string): number => {
  return PixelRatio.roundToNearestPixel(
    (screenWidth * parseFloat(widthPercent)) / 100,
  );
};

const heightPercentageToDP = (heightPercent: string): number => {
  return PixelRatio.roundToNearestPixel(
    (screenHeight * parseFloat(heightPercent)) / 100,
  );
};

const scaleConditional = screenScale <= 2 ? screenScale : 2;

const scalePercentageToDP = (percent: string): number => {
  return PixelRatio.roundToNearestPixel(scaleConditional * parseFloat(percent));
};

export { widthPercentageToDP, heightPercentageToDP, scalePercentageToDP };
