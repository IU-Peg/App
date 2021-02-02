import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native-animatable';

// eslint-disable-next-line @typescript-eslint/ban-types
type WithChildren<T = {}> = T & { children?: React.ReactNode };

type ComponentProps = WithChildren<{
  status?: boolean;
}>;

const Container = styled(View)``;

const AnimatedContainer = ({
  status,
  children,
  ...props
}: ComponentProps): JSX.Element => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!status) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 1000);
    }
  }, [status]);

  return (
    <>
      {show && (
        <Container
          useNativeDriver
          animation={!status ? 'fadeInUp' : 'fadeOut'}
          {...props}
        >
          {children}
        </Container>
      )}
    </>
  );
};

export default AnimatedContainer;
