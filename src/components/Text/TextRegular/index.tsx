import React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';

const TextRegularStyled = styled.Text`
  font-family: 'SarabunRegular';
`;

const TextRegular: React.FC<TextProps> = ({ ...props }) => {
  return <TextRegularStyled {...props} />;
};

export default TextRegular;
