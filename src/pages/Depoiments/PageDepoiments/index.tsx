import React, { useCallback, useEffect, useState } from 'react';
import { FiTrash, FiPenTool } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../../components/header';
import api from '../../../services/api';

import {
  Container,
  ActionsDepoiment,
  Depoiment,
  DepoimentsList,
  Content,
  Options,
} from './styles';

interface IDepoiment {
  id: string;
  depoiment: string;
  person: string;
}

const PageDepoiments: React.FC = () => {
  const [depoiments, setDepoiments] = useState<IDepoiment[]>([]);

  const history = useHistory();

  useEffect(() => {
    async function getDepoiments(): Promise<void> {
      const response = await api.get<IDepoiment[]>('/depoiments');
      setDepoiments(response.data);
    }

    getDepoiments();
  }, []);

  const handleDelete = useCallback(
    async (idDepoiment: string) => {
      try {
        console.log(depoiments);
        await api.delete(`/depoiments/${idDepoiment}`);
        const newDepoiments = depoiments.filter(
          depoi => depoi.id !== idDepoiment,
        );
        setDepoiments(newDepoiments);
        toast('Registro Excluído com sucesso', {
          type: 'success',
        });
      } catch {
        toast('Ocorreu um erro ao tentar excluir o registro', {
          type: 'error',
        });
      }
    },
    [depoiments],
  );
  return (
    <>
      <Header position={5} />
      <Container>
        <Content>
          <Options>
            <h1>Depoimentos</h1>

            <button
              type="button"
              onClick={() => {
                history.push('/depoiments/new');
              }}
            >
              Novo Depoimento
            </button>
          </Options>
          {depoiments.length <= 0 && (
            <h1 style={{ marginTop: '15%', textAlign: 'center' }}>
              Nenhum Depoimento Encotrado. Clique em cadastrar para cadastrar um
              novo depoimento
            </h1>
          )}
          <DepoimentsList>
            {depoiments.map(depoiment => (
              <Depoiment>
                <h1 key={depoiment.id}>{depoiment.person}</h1>

                <p>{depoiment.depoiment}</p>

                <ActionsDepoiment>
                  <button
                    onClick={() => {
                      handleDelete(depoiment.id);
                    }}
                    type="button"
                  >
                    <FiTrash />
                  </button>

                  <button type="button">
                    <FiPenTool />
                  </button>
                </ActionsDepoiment>
              </Depoiment>
            ))}
          </DepoimentsList>
        </Content>
      </Container>
    </>
  );
};

export default PageDepoiments;
