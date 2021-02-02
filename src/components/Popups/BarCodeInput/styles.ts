import styled from 'styled-components/native';
import Input from '../../Input';
import {
  heightPercentageToDP as h,
  scalePercentageToDP as s,
  widthPercentageToDP as w,
} from '../../../util/percentageToDP';

export const Container = styled.View`
  margin-top: ${s('2.5')}px;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  background-color: white;
  padding: ${s('11')}px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-color: 'rgba(0, 0, 0, 0.1)';
`;

export const InputStyled = styled(Input)`
  width: ${w('77.3')}px;
  height: ${h('6.3')}px;
  margin-bottom: ${s('21')}px;
  font-size: ${s('7.75')}px;
`;

export const ContentButtons = styled.View`
  flex-direction: row;
`;
