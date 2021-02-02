import React from 'react';
import { Button, ButtonProps } from 'react-native-elements';
import {
  scalePercentageToDP as s,
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../util/percentageToDP';

const GreenButton = ({ ...props }: ButtonProps): JSX.Element => {
  const styles = {
    button: {
      width: w('85'),
      height: h('7.65'),
      marginTop: s('14'),
      backgroundColor: '#3D8979',
    },
    title: {
      fontSize: s('11'),
    },
  };

  return (
    <Button buttonStyle={styles.button} titleStyle={styles.title} {...props} />
  );
};

export default GreenButton;
