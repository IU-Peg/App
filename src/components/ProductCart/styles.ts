import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import TextRegular from '../Text/TextRegular';
import TextSemiBold from '../Text/TextSemiBold';
import {
  scalePercentageToDP as s,
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../util/percentageToDP';

export const Container = styled.View`
  flex: 1;
  height: ${h('100')}px;

  background-color: #f9fafb;
`;

export const Product = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
`;

export const ItensList = styled(FlatList as new () => FlatList)`
  width: ${w('95')}px;
`;

export const ProductList = styled(RectButton)`
  border-radius: 6px;

  margin: ${s('6.5')}px ${s('8')}px 0 ${s('8')}px;

  background: #fff;

  box-shadow: 0px 2px 26px rgba(0, 0, 0, 0.06);
  elevation: 0.4;
`;

export const ProductDescription = styled.View`
  height: ${h('9')}px;
  margin-left: ${s('30')}px;
  top: ${s('5')}px;
`;

export const TextName = styled(TextRegular)`
  color: #171d33;
  font-size: ${s('8')}px;
  letter-spacing: ${s('0.01')}px;
`;

export const TextQuantity = styled(TextRegular)`
  color: #757f8c;
  font-size: ${s('7')}px;
  letter-spacing: ${s('0.1')}px;
`;

export const ProductPrice = styled.View`
  flex: 1;
  top: ${s('8')}px;
`;

export const TextPrice = styled(TextSemiBold)`
  bottom: ${s('26')}px;
  margin-right: ${s('8')}px;

  font-size: ${s('8')}px;
  text-align: right;

  color: red;
  letter-spacing: ${s('0.01')}px;
`;

export const CartTitle = styled(TextRegular)`
  color: #757f8c;
  font-size: ${s('8')}px;

  margin: 0 0 ${s('7.5')}px ${s('7.5')}px;
`;
