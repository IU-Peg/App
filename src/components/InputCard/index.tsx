import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { useField } from '@unform/core';
import {
  heightPercentageToDP as h,
  scalePercentageToDP as s,
  widthPercentageToDP as w,
} from '../../util/percentageToDP';

interface InputProps extends TextInputProps {
  name: string;
}

interface InputValueReference {
  value: string;
}

interface InputRefNA {
  focus(): void;
}

const InputStyled = styled.TextInput`
  max-width: ${w('100')}px;
  height: ${h('8')}px;
  padding: 0 ${s('4')}px 0 ${s('4')}px;
  border-radius: 6px;

  background: #f0f1f4;
  font-family: 'SarabunRegular';
  font-size: ${s('10')}px;
`;

const InputCard: React.ForwardRefRenderFunction<InputRefNA, InputProps> = (
  { name, ...props },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      // eslint-disable-next-line no-shadow
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <InputStyled
      ref={inputElementRef}
      defaultValue={defaultValue}
      onChangeText={value => {
        inputValueRef.current.value = value;
      }}
      {...props}
    />
  );
};

export default forwardRef(InputCard);
