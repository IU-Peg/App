import styled, { css } from 'styled-components/native';
import { View } from 'react-native-animatable';
import Constants from 'expo-constants';
import {
  heightPercentageToDP as h,
  scalePercentageToDP as s,
  widthPercentageToDP as w,
} from '../../util/percentageToDP';
import TextRegular from '../../components/Text/TextRegular';
import TextSemiBold from '../../components/Text/TextSemiBold';

interface SelectedProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;

  padding-top: ${Constants.statusBarHeight}px;
`;

export const Content = styled(View)`
  height: ${h('42')}px;
  background-color: white;
  border-radius: ${s('2')}px;
  margin: ${s('8')}px;

  align-items: center;
`;

export const BackButtonView = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${s('6')}px;
`;

export const BackButton = styled.TouchableOpacity`
  height: ${h('1.05')}px;
  width: ${w('16.5')}px;
  background-color: #d8d8d8;
  border-radius: ${s('1.75')}px;
`;

export const Section = styled.View`
  width: ${w('80')}px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom-width: 1px;
  border-bottom-color: #d8d8d8;
`;

export const Title = styled(TextSemiBold)`
  font-size: ${s('10')}px;
`;

export const Total = styled(TextSemiBold)`
  font-size: ${s('9')}px;
`;

export const CardIcon = styled.Image``;

export const CardSection = styled.View`
  right: ${s('10')}px;
`;

export const TitleCard = styled(TextRegular)`
  font-size: ${s('8')}px;
`;

export const InfoCard = styled(TextRegular)`
  font-size: ${s('7')}px;
  color: #9f9f9f;
`;

export const Swap = styled(TextSemiBold)`
  color: #3d8979;
  font-size: ${s('8.5')}px;
`;

export const Options = styled.View`
  justify-content: space-around;
`;

export const OptionsText = styled(TextRegular)`
  font-size: ${s('8')}px;
`;

export const OptionsSelected = styled.TouchableOpacity<SelectedProps>`
  width: ${w('5.3')}px;
  height: ${h('3')}px;
  border-radius: ${s('5')}px;
  background-color: #bfbfbf;

  ${props =>
    props.isSelected &&
    css`
      border: ${s('2.5')}px solid #3d8979;
      background-color: white;
    `}
`;
