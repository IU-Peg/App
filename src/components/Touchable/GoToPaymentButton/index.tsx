import React from 'react';
import styled from 'styled-components/native';
import Icon from '../../Icon/index';
import {
  scalePercentageToDP as s,
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../util/percentageToDP';

interface TouchableIconPropsElement {
  iconName: string;
  onPress?(): void;
}

const TouchableStyled = styled.TouchableOpacity`
  height: ${h('8.4')}px;
  width: ${w('14.4')}px;
  background-color: #54d3ad;
  border-radius: ${s('22.8')}px;

  position: relative;

  justify-content: center;
  align-items: center;

  box-shadow: 0px ${s('2')}px ${s('6')}px rgba(97, 62, 234, 0.5);
  elevation: 10;
`;

const IconStyled = styled(Icon)`
  position: absolute;
  color: #fff;
  font-size: ${s('20')}px;
`;

const GoToPaymentButton: React.FC<TouchableIconPropsElement> = ({
  iconName,
  onPress,
  ...props
}) => {
  return (
    <TouchableStyled onPress={onPress} {...props}>
      <IconStyled iconName={iconName} />
    </TouchableStyled>
  );
};

export default GoToPaymentButton;
