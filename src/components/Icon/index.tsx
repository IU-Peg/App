import React from 'react';
import { Feather } from '@expo/vector-icons';
import { scalePercentageToDP as s } from '../../util/percentageToDP';

// eslint-disable-next-line @typescript-eslint/ban-types
type WithChildren<T = {}> = T & { children?: React.ReactNode };

type IconPropsElement = WithChildren<{
  iconName: string;
  isSelected?: boolean;
  onPress?(): void;
  containerStyles?: {};
}>;

const Icon = ({
  iconName,
  children,
  containerStyles = {},
  onPress,
  ...props
}: IconPropsElement): JSX.Element => {
  return (
    <Feather
      onPress={onPress}
      name={iconName}
      style={containerStyles}
      size={s('13')}
      color="#a6aab0"
      {...props}
    >
      {children}
    </Feather>
  );
};

export default Icon;
