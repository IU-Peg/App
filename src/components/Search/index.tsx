import React from 'react';
import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';
import Icon from '../Icon';
import Input from '../Input';
import {
  heightPercentageToDP as h,
  scalePercentageToDP as s,
} from '../../util/percentageToDP';

interface InputProps extends TextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  ref?: any;
}

export const Container = styled.View`
  margin: 0 ${s('8')}px ${s('5')}px ${s('8')}px;
`;

export const InputStyled = styled(Input)`
  height: ${h('4.8')}px;
  font-size: ${s('8')}px;
  position: relative;
`;

export const IconStyled = styled(Icon)`
  position: absolute;
  right: 0;
  font-size: ${s('6')}px;

  margin: ${s('5')}px ${s('8')}px 0 0;
`;

const Search: React.FC<InputProps> = ({
  value,
  ref,
  onChangeText,
  ...props
}) => {
  return (
    <Container>
      <InputStyled
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar produto no carrinho"
        {...props}
      />
      <IconStyled iconName="search" />
    </Container>
  );
};

export default Search;
