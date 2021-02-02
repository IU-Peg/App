import React from 'react';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import {
  scalePercentageToDP as s,
  widthPercentageToDP as w,
} from '../../util/percentageToDP';

const GoogleSignIn = (): JSX.Element => {
  const { signIn } = useAuth();

  const styles = {
    title: {
      fontSize: s('11'),
      color: '#000',
      marginRight: s('6'),
    },
    icon: {
      marginRight: s('8'),
      marginLeft: s('6'),
    },
    button: {
      backgroundColor: '#fff',
      width: w('86'),
      borderWidth: s('0.6'),
      borderColor: '#3D8979',
      marginBottom: s('3'),
    },
  };

  return (
    <Button
      icon={<Ionicons name="logo-google" size={s('25')} style={styles.icon} />}
      title="Continuar com o Google"
      buttonStyle={styles.button}
      titleStyle={styles.title}
      onPress={signIn}
    />
  );
};

export default GoogleSignIn;
