import React from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import {
  heightPercentageToDP as h,
  scalePercentageToDP as s,
  widthPercentageToDP as w,
} from '../../util/percentageToDP';

interface TextInputPropsElement extends TextInputProps {
  ref?: any;
}

const InputStyled = styled.TextInput`
  max-width: ${w('100')}px;
  height: ${h('8')}px;
  padding: 0 ${s('4')}px 0 ${s('4')}px;
  border-radius: 6px;

  background: #f0f1f4;
  font-family: 'SarabunRegular';
  font-size: ${s('10')}px;
`;

const Input: React.FC<TextInputPropsElement> = ({ ref, ...props }) => {
  return <InputStyled ref={ref} placeholderTextColor="#a6aab4" {...props} />;
};

export default Input;
