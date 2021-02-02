import styled from 'styled-components/native';
import Icon from '../../Icon';
import TextRegular from '../../Text/TextRegular';
import TextSemiBold from '../../Text/TextSemiBold';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w,
  scalePercentageToDP as s,
} from '../../../util/percentageToDP';

export const Container = styled.View`
  flex: 1;

  flex-direction: column-reverse;
`;

export const Content = styled.View`
  height: ${h('35')}px;
  background-color: white;
  border-radius: ${s('2')}px;
  padding: ${s('8')}px;

  justify-content: flex-end;
`;

export const Section = styled.View`
  flex: 1;

  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled(TextSemiBold)`
  font-size: ${s('15')}px;
  width: ${w('50')}px;
`;

export const CardIcon = styled(Icon)`
  font-size: ${s('30')}px;
  color: black;
`;

export const Info = styled(TextRegular)`
  font-size: ${s('10')}px;
  margin-bottom: ${s('6')}px;
  padding-right: ${s('50')}px;
`;
