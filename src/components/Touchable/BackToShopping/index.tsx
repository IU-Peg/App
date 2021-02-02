import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../Icon';
import { scalePercentageToDP as s } from '../../../util/percentageToDP';

const IconBackToShopping = styled(Icon)`
  color: #fff;
  font-size: ${s('20')}px;
`;

const BackToShopping: React.FC = props => {
  const { navigate } = useNavigation();

  const navigateToShopping = useCallback(() => {
    navigate('Shopping');
  }, [navigate]);

  return (
    <TouchableOpacity onPress={navigateToShopping} {...props}>
      <IconBackToShopping iconName="arrow-left" />
    </TouchableOpacity>
  );
};

export default BackToShopping;
