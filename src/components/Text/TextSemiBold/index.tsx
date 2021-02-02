import React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';

const TextSemiBoldStyled = styled.Text`
  font-family: 'SarabunSemiBold';
`;

const TextSemiBold: React.FC<TextProps> = ({ ...props }) => {
  return <TextSemiBoldStyled {...props} />;
};

export default TextSemiBold;
