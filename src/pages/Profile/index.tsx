import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@material-ui/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import {
  ContainerProfile,
  ContentProfile,
  InputGroup,
  Section,
  TitleSection,
} from './style';
import Header from '../../components/header';
import Input from '../../components/input';

interface User {
  name: string;
  email: string;
  telephone: string;
  cep: string;
  city: string;
  address: string;
  neighborhood: string;
  addressNumber: string;
  complement: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User>({} as User);
  useEffect(() => {
    async function getUserData(): Promise<void> {
      const response = await api.get<User>(`users/${user.id}`);
      setUserData(response.data);
    }

    getUserData();
  }, [user.id]);

  const handleUpdateProfile = useCallback(async () => {
    try {
      await api.put('/users', userData);
      toast('Perfil atualizado com sucesso !!', {
        type: 'success',
      });
    } catch {
      toast('Ocorreu um falha ao atualizar o perfil', {
        type: 'error',
      });
    }
  }, [userData]);
  return (
    <>
      <Header />

      <ContainerProfile>
        <ContentProfile>
          <Form onSubmit={handleUpdateProfile}>
            <Section>
              <TitleSection>Dados Gerais</TitleSection>

              <Input
                label="Nome"
                value={userData.name}
                id="name"
                name="name"
                type="text"
                onChange={evt => {
                  setUserData({ ...userData, name: evt.target.value });
                }}
              />

              <InputGroup>
                <Input
                  value={userData.email}
                  disabled
                  label="E-mail"
                  name="email"
                  type="text"
                  onChange={evt => {
                    setUserData({ ...userData, email: evt.target.value });
                  }}
                />

                <Input
                  value={userData.telephone}
                  label="Telephone"
                  name="telephone"
                  type="text"
                  onChange={evt => {
                    setUserData({ ...userData, telephone: evt.target.value });
                  }}
                />
              </InputGroup>
            </Section>

            <Section>
              <TitleSection>Endereço</TitleSection>

              <Input
                value={userData.city}
                label="Cidade"
                name="city"
                type="text"
                onChange={evt => {
                  setUserData({ ...userData, city: evt.target.value });
                }}
              />

              <InputGroup>
                <Input
                  value={userData.address}
                  label="Endereço"
                  name="address"
                  type="text"
                  onChange={evt => {
                    setUserData({ ...userData, address: evt.target.value });
                  }}
                />

                <Input
                  value={userData.neighborhood}
                  label="Bairro"
                  name="neighborhood"
                  type="text"
                  onChange={evt => {
                    setUserData({
                      ...userData,
                      neighborhood: evt.target.value,
                    });
                  }}
                />
              </InputGroup>

              <InputGroup>
                <Input
                  value={userData.addressNumber}
                  label="Número"
                  name="addressNumber"
                  type="text"
                  onChange={evt => {
                    setUserData({
                      ...userData,
                      addressNumber: evt.target.value,
                    });
                  }}
                />

                <Input
                  value={userData.complement}
                  label="Complemento"
                  name="complement"
                  type="text"
                  onChange={evt => {
                    setUserData({
                      ...userData,
                      complement: evt.target.value,
                    });
                  }}
                />
              </InputGroup>
            </Section>

            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </Form>
        </ContentProfile>
      </ContainerProfile>
    </>
  );
};

export default Profile;
