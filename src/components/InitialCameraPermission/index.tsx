/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { includes } from 'ramda';
import { Button } from 'react-native-elements';
import { useCameraPermission } from '../../hooks/useCameraPermission';
import {
  scalePercentageToDP as s,
  widthPercentageToDP as w,
} from '../../util/percentageToDP';

const InitialCameraPermission = (): JSX.Element => {
  const [isGranted, setGranted] = useState(false);

  const {
    hasPermission,
    openSettings,
    getCurrentStatus,
  } = useCameraPermission();

  useEffect(() => {
    getCurrentStatus();
    const verifUndetermined = includes('undetermined', hasPermission);
    const verifDenied = includes('denied', hasPermission);
    const verifGranted = includes('granted', hasPermission);

    if (verifUndetermined || verifDenied) {
      setGranted(false);
    } else if (verifGranted) {
      setGranted(true);
    }
  }, [hasPermission, getCurrentStatus]);

  const stylesButton = {
    undefinedButton: {
      backgroundColor: '#3d8979',
      width: w('86'),
      marginTop: s('3'),
      borderWidth: s('0.6'),
      borderColor: '#000',
    },
    grantedButton: {
      backgroundColor: '#fff',
      width: w('86'),
      marginTop: s('3'),
      borderWidth: s('0.6'),
      borderColor: '#3d8979',
    },
    title: {
      color: '#fff',
      fontFamily: 'SarabunSemiBold',
      fontSize: 22,
    },
    icon: {
      marginRight: s('6'),
      marginLeft: s('4'),
    },
  };

  const iconDif = isGranted ? 'check-circle' : 'camera';
  const titleDif = isGranted ? '' : 'Permitir acesso a câmera';
  const stylesButtonDif = isGranted
    ? stylesButton.grantedButton
    : stylesButton.undefinedButton;
  // eslint-disable-next-line prettier/prettier
  const onPressDif = isGranted ? () => { } : openSettings;

  return (
    <Button
      icon={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <MaterialCommunityIcons
          name={iconDif}
          size={s('25')}
          style={stylesButton.icon}
        />
      }
      buttonStyle={stylesButtonDif}
      title={titleDif}
      titleStyle={stylesButton.title}
      onPress={onPressDif}
      disabled={isGranted}
      disabledStyle={{ backgroundColor: '#fff', opacity: 0.4 }}
    />
  );
};

export default InitialCameraPermission;
