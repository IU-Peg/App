import styled from 'styled-components/native';
import InputCard from '../../components/InputCard';
import {
  scalePercentageToDP as s,
  widthPercentageToDP as w,
} from '../../util/percentageToDP';
import Icon from '../../components/Icon';
import TouchableIcon from '../../components/Touchable/TouchableIcon';

export const Container = styled.View`
  flex: 1;
  padding-top: ${s('22')}px;

  justify-content: flex-start;
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const StyledIcon = styled(TouchableIcon)`
  color: black;
  font-size: ${s('16')}px;
  right: ${s('11')}px;
`;

export const Content = styled.View`
  width: ${w('85')}px;
`;

export const CardNumberContent = styled.View`
  justify-content: center;
`;

export const CardNumber = styled(InputCard)`
  margin-bottom: ${s('5')}px;
  position: relative;
  padding-left: ${s('25')}px;
`;

export const CardIcon = styled(Icon)`
  position: absolute;
  font-size: ${s('16')}px;
  top: ${s('5')}px;
  margin-left: ${s('5')}px;
`;

export const Section = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: ${s('5')}px;
`;

export const SectionContent = styled.View`
  justify-content: center;
  position: relative;
`;

export const InfoIcon = styled(Icon)`
  position: absolute;
  align-self: flex-end;

  padding-right: ${s('5')}px;
`;

export const ExpiringDateAndCVV = styled(InputCard)`
  width: ${w('35')}px;
  padding-right: ${s('25')}px;
`;

export const CardName = styled(InputCard)`
  margin-bottom: ${s('5')}px;
`;

export const CpfOrCnpj = styled(InputCard)``;
