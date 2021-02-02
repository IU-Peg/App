import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import Icon from '../../components/Icon';
import TextRegular from '../../components/Text/TextRegular';
import TextSemiBold from '../../components/Text/TextSemiBold';
import BackToShopping from '../../components/Touchable/BackToShopping';

export const Container = styled.View`
  flex: 1;

  padding-top: ${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
`;

export const Header = styled.View`
  padding: 40px 24px 20px;
  height: 190px;
  width: 100%;
  background: #54d3ad;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 0;

  position: absolute;
`;

export const IconBackToShopping = styled(BackToShopping)`
  position: absolute;
  padding: 0 0 60px 10px;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
  },
})`
  margin-top: 80px;
`;

export const ProductContainer = styled.View`
  padding: 0 24px;
`;

export const Product = styled.View`
  flex-direction: column;
  background: #f0f0f5;
  border-radius: 8px;
  margin-bottom: 16px; ;
`;

export const ProductImageContainer = styled.View`
  overflow: hidden;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;
`;

export const ProductContent = styled.View`
  padding: 24px; ;
`;

export const ProductTitle = styled(TextSemiBold)`
  font-size: 24px;
  color: #3d3d4d;
`;

export const ProductDescription = styled(TextRegular)`
  font-size: 18px;
  margin-top: 8px;
  color: #3d3d4d;
`;

export const ProductPricing = styled(TextSemiBold)`
  font-size: 24px;
  color: #6c6c80;
  margin-top: 8px;
`;

export const TotalContainer = styled.View`
  padding: 0 24px;
  margin-top: 20px;
`;

export const TotalTitle = styled(TextSemiBold)`
  font-size: 24px;
  color: #3d3d4d;
`;

export const PriceButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalPrice = styled(TextSemiBold)`
  font-size: 26px;
  color: red;
  margin-top: 16px;
`;

export const QuantityContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 130px;
  background: #f0f0f5;
  border-radius: 8px;
  padding: 10px 15px;
  margin-top: 25px;
`;

export const IconDecrement = styled(Icon)`
  color: #6c6c80;
  font-size: 20px;
`;

export const AdittionalItemText = styled(TextRegular)`
  font-size: 20px;
  color: #6c6c80;
`;

export const IconIncrement = styled(Icon)`
  color: #6c6c80;
  font-size: 20px;
`;

export const FinishOrderButton = styled.TouchableOpacity`
  background-color: #3d8979;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  margin-top: 26px;
`;

export const ButtonText = styled(TextSemiBold)`
  font-size: 15px;
  color: #fff;
  flex: 1;
  text-align: center;
`;

export const IconContainer = styled.View`
  background-color: #46ad97;
  padding: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const IconCheck = styled(Icon)`
  color: #fff;
  font-size: 24px;
`;
