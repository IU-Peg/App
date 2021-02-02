import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { Container, Content, Section, Title, CardIcon, Info } from './styles';
import {
  heightPercentageToDP as h,
  scalePercentageToDP as s,
} from '../../../util/percentageToDP';

interface ComponentProps {
  title: string;
  info: string;
  iconName: string;
  isVisible: boolean;
}

const InfoExpiringDateAndCVV = ({
  info,
  title,
  isVisible,
  iconName,
}: ComponentProps): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
    }
  }, [isVisible]);

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  return (
    <Modal
      backdropColor="#B4B3DB"
      backdropOpacity={0.8}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      isVisible={isModalVisible}
      useNativeDriver
    >
      <Container>
        <Content>
          <Section>
            <Title>{title}</Title>
            <CardIcon iconName={iconName} />
          </Section>
          <Info>{info}</Info>
          <Button
            onPress={toggleModal}
            title="Ok"
            titleStyle={{ fontSize: s('11.5') }}
            buttonStyle={{ height: h('7'), backgroundColor: '#3D8979' }}
          />
        </Content>
      </Container>
    </Modal>
  );
};

export default InfoExpiringDateAndCVV;
