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
import ReactPlayer from 'react-player';
import Header from '../../components/header';
import api from '../../services/api';

import {
  ItemList,
  Speeches,
  ContainerDashboard,
  ExpiredContent,
} from './style';

interface Speeche {
  id: string;
  name: string;
  price: number;
  description: string;
  expired: boolean;
}

interface UserData {
  name: string;
  courses: Speeche[];
}

interface Course {
  limitAccess: DataCue;
  id: string;
  name: string;
}
const Dashboard: React.FC = () => {
  const history = useHistory();
  const [speeches, setSpeeches] = useState<Speeche[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalItem, setModalItem] = useState<string>('');

  useEffect(() => {
    api.get<Speeche[]>('/users/courses').then(response => {
      setSpeeches(response.data);
    });
  }, []);

  const handleClickOpen = useCallback(
    async (id: string) => {
      setModalItem(id);

      const response = await api.get<Course>(`/courses/${id}`);
      if (response.data.limitAccess) {
        history.push(`video/${id}`);
      } else {
        setOpenModal(true);
      }
    },
    [history],
  );

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
        <DialogTitle id="alert-dialog-title">
          ATENÇÃO !!!
          <strong color="red"> Assista o video antes de continuar</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ReactPlayer
              width="100%"
              url="https://www.youtube.com/watch?v=Rsj_z43oNRk"
            />
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
                <Button disabled={spc.expired} type="button">
                  <FiPlay
                    onClick={() => {
                      handleClickOpen(spc.id);
                    }}
                    size={40}
                  />
                </Button>
                <div>
                  <h2>{spc.name}</h2>
                  {/*
                  <p>{spc?.description}</p> */}
                </div>
                <ExpiredContent>
                  {spc.expired ? 'Acesso Expirado' : ''}
                </ExpiredContent>
              </ItemList>
            );
          })}
        </Speeches>
      </ContainerDashboard>
    </>
  );
};

export default Dashboard;
