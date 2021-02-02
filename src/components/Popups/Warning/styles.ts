import styled from 'styled-components/native';
import {
  heightPercentageToDP as h,
  scalePercentageToDP as s,
} from '../../../util/percentageToDP';
import TextRegular from '../../Text/TextRegular';
import TextSemiBold from '../../Text/TextSemiBold';

export const Content = styled.View`
  height: ${h('66')}px;
  background-color: white;
  border-radius: ${s('2')}px;

  align-items: center;
  justify-content: space-between;
`;

export const Title = styled(TextSemiBold)`
  font-size: ${s('10')}px;
  letter-spacing: 0.2px;
`;

export const Info = styled(TextRegular)`
  padding: 0 ${s('20')}px;
  font-size: ${s('8')}px;
  color: #7a7a7a;
  text-align: center;
`;
