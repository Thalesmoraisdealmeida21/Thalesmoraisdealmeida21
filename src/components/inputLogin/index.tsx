import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { Container } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const InputLogin: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const { fieldName, error, registerField } = useField(name);
  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container haveError={!!error}>
        {Icon && <Icon size={20} />}
        <input ref={inputRef} {...rest} />
      </Container>
    </>
  );
};

export default InputLogin;
