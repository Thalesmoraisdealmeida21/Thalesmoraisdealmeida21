import React, { useEffect, useState, useCallback } from 'react';
import { FiPlay } from 'react-icons/fi';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/header';
import api from '../../services/api';

import { ItemList, Speeches, ContainerDashboard } from './style';

interface Speeche {
  id: string;
  name: string;
  price: number;
}

interface UserData {
  name: string;
  courses: Speeche[];
}
const Dashboard: React.FC = () => {
  const history = useHistory();
  const [speeches, setSpeeches] = useState<Speeche[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalItem, setModalItem] = useState<string>('');

  useEffect(() => {
    api.get<UserData>('/users/courses').then(response => {
      setSpeeches(response.data.courses);
    });
  }, []);

  const handleClickOpen = useCallback(async (id: string) => {
    setModalItem(id);
    setOpenModal(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, []);

  const redirectToVideo = useCallback(async () => {
    try {
      await api.put('/users/courses', {
        course_id: modalItem,
      });
    } catch (err) {
      toast('Ocorreu um erro', {
        type: 'error',
      });
    }
    history.push(`/video/${modalItem}`);
  }, [history, modalItem]);
  return (
    <>
      <Header />

      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">ATENÇÃO !!!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            No momento que você confirmar, clicando no botão abaixo. Você tera
            um prazo de 24 hroas para assistir a paletra. Passado este periodo
            não poderá mais acessar o conteúdo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={redirectToVideo} color="primary" autoFocus>
            confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <ContainerDashboard>
        <h1>Minhas Palestras</h1>

        <Speeches>
          {speeches?.map(spc => {
            return (
              <ItemList key={spc.id}>
                <button type="button">
                  <FiPlay
                    onClick={() => {
                      handleClickOpen(spc.id);
                    }}
                    size={40}
                  />
                </button>
                <div>
                  <h2>{spc.name}</h2>

                  <h3>
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(spc.price)}
                  </h3>
                </div>
              </ItemList>
            );
          })}
        </Speeches>
      </ContainerDashboard>
    </>
  );
};

export default Dashboard;
