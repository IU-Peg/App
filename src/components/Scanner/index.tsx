import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import styled from 'styled-components/native';
import { useCart } from '../../hooks/useCartContext';
import findProductByID from '../../util/findProductByID';
import { useCameraPermission } from '../../hooks/useCameraPermission';
import AnimatedContainer from '../Animatable/AnimatedContainer';
import {
  heightPercentageToDP as h,
  scalePercentageToDP as s,
  widthPercentageToDP as w,
} from '../../util/percentageToDP';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo';

interface ComponentProps {
  statusCamera: boolean;
}

interface BarCodeScannerResult {
  type: string;
  data: string;
}

const Container = styled(AnimatedContainer)`
  flex-direction: column;

  margin-top: ${s('5')}px;
  height: ${h('20')}px;
  width: ${w('70')}px;

  justify-content: center;
`;

const Scanner = ({ statusCamera }: ComponentProps): JSX.Element => {
  const [scanned, setScanned] = useState(false);

  const { addItem } = useCart();
  const {
    getCurrentStatus,
    openSettings,
    hasPermission,
  } = useCameraPermission();

  useEffect(() => {
    getCurrentStatus();
  }, [getCurrentStatus]);

  if (hasPermission === 'denied') {
    return (
      <>
        {!statusCamera && (
          <Container>
            <Button
              type="clear"
              title="Permissão acesso à câmera"
              onPress={openSettings}
              titleStyle={{ color: '#007AFF' }}
            />
          </Container>
        )}
      </>
    );
  }

  const handleBarCodeScanned = ({ data }: BarCodeScannerResult): void => {
    console.log("DATA " + JSON.stringify(data))
    const product = findProductByID(data);

    const sucess = (): void => {
      addItem(product);
    };

    const notFound = (): void => {
      Alert.alert(
        'Erro na leitura',
        'Ocorreu um erro ao realizar a leitura do código de barras, tente novamente',
        [
          {
            text: 'Escanear novamente.',
            onPress: () => setScanned(false),
          },
        ],
      );
    };

    setScanned(true);
    return product ? sucess() : notFound();
  };
  
  const teste = async () => {
    const dados = await Camera.isAvailableAsync()
    console.log(JSON.stringify(dados))
  }

  useEffect(()=>{
    teste()
  },[])

  return (
    <Container useNativeDriver status={statusCamera}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ratio='16:9'
        style={StyleSheet.absoluteFillObject}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13],
        }}
      />
      {/**
         * <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
       */}
      {scanned && (
        <Button
          title="Toque aqui para escanear novamente"
          onPress={() => setScanned(false)}
        />
      )}
    </Container>
  );
};

export default Scanner;
