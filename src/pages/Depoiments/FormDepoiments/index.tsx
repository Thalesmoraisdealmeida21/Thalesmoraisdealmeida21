import React from 'react';
import { Form } from '@unform/web';
import Input from '../../../components/input';
import Textarea from '../../../components/textarea';

import { ContainerForm } from './styles';

interface IFormDepoiment {
  titleButton: string;
  sendForm: any;
}
const FormDepoiment: React.FC<IFormDepoiment> = ({ titleButton, sendForm }) => {
  return (
    <>
      <ContainerForm>
        <Form onSubmit={sendForm}>
          <Input label="Pessoa" name="person" />
          <Textarea height={90} label="Depoimento" name="depoiment" />

          <button type="submit">{titleButton}</button>
        </Form>
      </ContainerForm>
    </>
  );
};

export default FormDepoiment;
