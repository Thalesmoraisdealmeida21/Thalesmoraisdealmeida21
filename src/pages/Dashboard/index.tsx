import React, { useEffect, useState } from 'react';
import { FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';
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
  const [speeches, setSpeeches] = useState<Speeche[]>([]);
  useEffect(() => {
    api.get<UserData>('/users/courses').then(response => {
      setSpeeches(response.data.courses);
    });
  }, [speeches]);
  return (
    <>
      <Header />

      <ContainerDashboard>
        <h1>Minhas Palestras</h1>

        <Speeches>
          {speeches?.map(spc => {
            return (
              <ItemList key={spc.id}>
                <button type="button">
                  <Link to="video/4564654/1231321">
                    <FiPlay size={40} />
                  </Link>
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
