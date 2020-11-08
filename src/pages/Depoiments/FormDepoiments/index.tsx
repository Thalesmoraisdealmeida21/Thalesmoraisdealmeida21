/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Form } from '@unform/web';
import Input from '../../../components/input';
import Textarea from '../../../components/textarea';

import { ContainerForm } from './styles';

interface IDepoiment {
  person: string;
  depoiment: string;
}

interface IFormDepoiment {
  titleButton: string;
  sendForm: any;
  dataDepoiment?: IDepoiment;
}

const FormDepoiment: React.FC<IFormDepoiment> = ({
  titleButton,
  sendForm,
  dataDepoiment,
}) => {
  const [depoiment, setDepoiment] = useState<IDepoiment>(
    dataDepoiment || ({} as IDepoiment),
  );

  useEffect(() => {
    setDepoiment(
      dataDepoiment || {
        depoiment: '',
        person: '',
      },
    );
  }, [dataDepoiment]);

  return (
    <>
      <ContainerForm>
        <Form onSubmit={sendForm}>
          <Input
            label="Pessoa"
            name="person"
            value={depoiment?.person}
            onChange={evt => {
              setDepoiment({ ...depoiment, person: evt.target.value });
            }}
          />
          <Textarea
            height={90}
            label="Depoimento"
            name="depoiment"
            value={depoiment?.depoiment}
            onChange={evt => {
              setDepoiment({ ...depoiment, depoiment: evt.target.value });
            }}
          />

          <button type="submit">{titleButton}</button>
        </Form>
      </ContainerForm>
    </>
  );
};

export default FormDepoiment;
