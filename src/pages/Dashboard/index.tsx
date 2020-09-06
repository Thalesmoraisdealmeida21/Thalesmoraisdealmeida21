import React, { useEffect, useState } from 'react';
import { FiPlay, FiShoppingCart } from 'react-icons/fi';
import Header from '../../components/header';
import api from '../../services/api';

import { ItemList, Speeches, ContainerDashboard } from './style';

interface speeche {
  name: string;
  price: number;
}
const Dashboard: React.FC = () => {
  const [speeches, setSpeeches] = useState<speeche[]>([]);
  useEffect(() => {
    api.get<speeche[]>('/courses').then(response => {
      setSpeeches(response.data);
    });
  }, [speeches]);
  return (
    <>
      <Header />

      <ContainerDashboard>
        <h1>Palestras</h1>

        <Speeches>
          {speeches?.map(spc => {
            return (
              <ItemList>
                <button type="button">
                  <FiPlay size={40} />
                </button>

                <h2>{spc.name}</h2>

                <h3>
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(spc.price)}
                </h3>
                <FiShoppingCart size={40} />
              </ItemList>
            );
          })}
          )
        </Speeches>
      </ContainerDashboard>
    </>
  );
};

export default Dashboard;
