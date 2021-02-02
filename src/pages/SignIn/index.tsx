/* eslint-disable global-require */
import React from 'react';
import { Image } from 'react-native';
import GoogleSignIn from '../../components/GoogleSignIn';
import InitialCameraPermission from '../../components/InitialCameraPermission';
import {
  Container,
  Header,
  TitleHeader,
  SloganHeader,
  Section,
  Footer,
} from './styles';

const SignIn = (): JSX.Element => {
  return (
    <Container>
      <Header>
        <TitleHeader>BEM-VINDO</TitleHeader>
        <SloganHeader>Faça compras sem pegar filas!</SloganHeader>
      </Header>
      <Section>
        <Image source={require('../../assets/home-image-png.png')} />
      </Section>
      <Footer>
        <GoogleSignIn />
        <InitialCameraPermission />
      </Footer>
    </Container>
  );
};

export default SignIn;
