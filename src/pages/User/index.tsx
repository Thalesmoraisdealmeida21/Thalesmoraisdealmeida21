import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import { Button, Input } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import Header from '../../components/header';

import { ContainerUsers, TableHeaderContent } from './styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
} {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const User: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Header position={3} />
      <ContainerUsers>
        <TableContainer component={Paper}>
          <TableHeaderContent>
            <h1>Usuários</h1>
            <Input name="search" placeholder="Buscar um usuário" />
            <Button variant="contained" color="primary">
              Enviar E-mail Para todos
            </Button>
          </TableHeaderContent>

          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome do Usuário</TableCell>
                <TableCell align="right">E-mail</TableCell>
                <TableCell align="right">Criação da Conta</TableCell>
                <TableCell align="right">Opções</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">
                    <Button>Enviar E-mail</Button>
                    <Button>Mais Informações</Button>
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
