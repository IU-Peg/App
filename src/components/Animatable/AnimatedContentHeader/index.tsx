/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { createAnimatableComponent as Animated } from 'react-native-animatable';
import { scalePercentageToDP as s } from '../../../util/percentageToDP';

// eslint-disable-next-line @typescript-eslint/ban-types
type WithChildren<T = {}> = T & { children?: React.ReactNode };

type FunctionProps = WithChildren<{
  statusCamera: boolean;
}>;

const JustStyles = styled.View`
  margin-top: ${s('2.5')}px;

  align-items: center;
  justify-content: center;
`;

const ToContentHeader = Animated(JustStyles);

const FromContentHeader = Animated(JustStyles);

const AnimatedContentHeader = ({
  statusCamera,
  children,
}: FunctionProps): JSX.Element => {

  return (
    <View>
      {statusCamera ? (
        <ToContentHeader animation={statusCamera ? 'slideInDown' : 'fadeOut'} delay={1000} useNativeDriver>{children}</ToContentHeader>
      ) : (
          <FromContentHeader animation={!statusCamera ? 'slideInUp' : 'fadeOut'} useNativeDriver>{children}</FromContentHeader>
        )}
    </View>
  );
};

export default AnimatedContentHeader;
