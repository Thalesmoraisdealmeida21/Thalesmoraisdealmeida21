/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import { Button, Input } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { format } from 'date-fns';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header';
import api from '../../services/api';

import {
  ContainerUsers,
  TableHeaderContent,
  ContainerUser,
  FormGroup,
} from './styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface User {
  id: string;
  name: string;
  email: string;
  telephone: string;
  cpfCnpj: string;
  address: string;
  neighborhood: string;
  city: string;
  uf: string;
  cep: number;
  addressNumber: number;
  complement: string;
  created_at: Date;
}

const User: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<User[]>([]);
  const [userSelect, setUserSelect] = useState<User>({} as User);
  const [statusModal, setStatusModal] = useState<boolean>(false);

  const history = useHistory();
  useEffect(() => {
    async function getUsers(): Promise<void> {
      const response = await api.get<User[]>('/users');
      setUsers(response.data);
    }

    getUsers();
  }, []);

  const toggleModal = useCallback(
    async user_id => {
      try {
        const response = await api.get<User>(`/users/${user_id}`);
        setUserSelect(response.data);
        setStatusModal(!statusModal);
      } catch {
        toast('Ocorreu um erro ao obter os dados do usuario', {
          type: 'error',
        });
      }
    },
    [statusModal],
  );

  const searchUser = useCallback(async search => {
    try {
      if (!search) {
        const response = await api.get<User[]>(`/users`);
        setUsers(response.data);
      } else {
        const response = await api.get<User[]>(
          `/users/search?search=${search}`,
        );
        setUsers(response.data);
      }
    } catch {
      toast('Ocorreu um erro na pesquisa de usuário', {
        type: 'error',
      });
    }
  }, []);

  const closeModal = useCallback(() => {
    setStatusModal(!statusModal);
  }, [statusModal]);

  return (
    <>
      <Header position={3} />

      <Dialog
        maxWidth="lg"
        onClose={toggleModal}
        aria-labelledby="simple-dialog-title"
        open={statusModal}
      >
        <DialogTitle id="simple-dialog-title">
          <h1>{userSelect.name}</h1>
        </DialogTitle>

        <ContainerUser>
          <form>
            <FormGroup>
              <input
                type="text"
                disabled
                value={userSelect.email || 'Não informado'}
              />
              <input
                type="text"
                disabled
                value={userSelect.telephone || 'Não informado'}
              />
            </FormGroup>

            <input
              type="text"
              disabled
              value={userSelect.address || 'Não informado'}
            />

            <input
              type="text"
              disabled
              value={userSelect.neighborhood || 'Não informado'}
            />
            <FormGroup>
              <input
                type="text"
                disabled
                value={userSelect.city || 'Não informado'}
              />
              <input
                type="text"
                disabled
                value={userSelect.cep || 'Não informado'}
              />
              <input
                type="text"
                disabled
                value={userSelect.uf || 'Não informado'}
              />
            </FormGroup>
          </form>

          <Button color="primary" variant="outlined" onClick={closeModal}>
            Fechar
          </Button>
        </ContainerUser>
      </Dialog>

      <ContainerUsers>
        <TableContainer component={Paper}>
          <TableHeaderContent>
            <h1>Usuários</h1>
            <Input
              name="search"
              onChange={evt => {
                searchUser(evt.target.value);
              }}
              placeholder="Buscar um usuário"
            />
            <Button variant="contained" color="primary">
              Enviar E-mail Para todos
            </Button>
          </TableHeaderContent>

          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Nome do Usuário</b>
                </TableCell>
                <TableCell align="left">
                  <b>E-mail</b>
                </TableCell>
                <TableCell align="center">
                  <b>Criação da Conta</b>
                </TableCell>
                <TableCell align="center">
                  <b>Opções</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="center">
                    {format(new Date(user.created_at), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      style={{ margin: '10px' }}
                      color="default"
                      size="small"
                      onClick={() => {
                        history.push(`/users/sendmail/${user.id}`);
                      }}
                    >
                      Enviar E-mail
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => {
                        toggleModal(user.id);
                      }}
                      color="secondary"
                      size="small"
                    >
                      Mais Informações
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ContainerUsers>
    </>
  );
};

export default User;
