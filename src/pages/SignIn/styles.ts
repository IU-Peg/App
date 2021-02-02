import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import TextSemiBold from '../../components/Text/TextSemiBold';
import { scalePercentageToDP as s } from '../../util/percentageToDP';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  margin-top: ${s('10')}px;

  background: #f9fafb;
  padding-top: ${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TitleHeader = styled(TextSemiBold)`
  font-size: ${s('9')}px;
  line-height: ${s('14')}px;
  letter-spacing: 0.1px;
  color: #757f8c;
`;

export const SloganHeader = styled(TextSemiBold)`
  font-size: ${s('11')}px;
  line-height: ${s('14')}px;
  letter-spacing: 0.1px;
  color: #757f8c;

  margin-top: ${s('10')}px;
`;

export const Section = styled.View``;

export const Footer = styled.View`
  margin-top: ${s('6')}px;
  padding: ${s('9')}px 0 ${s('14.5') + getBottomSpace()}px 0;
`;
