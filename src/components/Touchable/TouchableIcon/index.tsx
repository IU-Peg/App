import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon from '../../Icon/index';

interface TouchableIconPropsElement extends TouchableOpacityProps {
  iconName: string;
}

const TouchableIcon: React.FC<TouchableIconPropsElement> = ({
  iconName,
  ...props
}) => {
  return (
    <TouchableOpacity {...props}>
      <Icon iconName={iconName} {...props} />
    </TouchableOpacity>
  );
};

export default TouchableIcon;
