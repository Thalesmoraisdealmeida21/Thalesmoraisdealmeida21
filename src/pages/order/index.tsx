import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { ContainerOrders, ListContainer, Order } from './styles';

import Header from '../../components/header';
import api from '../../services/api';

interface Order {
  id: string;
  code: string;
  // eslint-disable-next-line camelcase
  created_at: string;
  user: {
    id: string;
    name: string;
  };
  status: string;
}

const ListOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const history = useHistory();

  useEffect(() => {
    async function getOrders(): Promise<void> {
      const response = await api.get<Order[]>('/orders');

      setOrders(response.data);
    }
    try {
      getOrders();
    } catch {
      toast('Ocorreu um erro ao trazer os dados das públicações');
    }
  }, []);

  return (
    <>
      <Header position={5} />

      <ContainerOrders>
        <ListContainer>
          {orders.map((order, ind) => (
            <Order>
              <strong>{ind + 1}</strong>

              <strong>
                {format(new Date(order.created_at), 'dd/MM/yyyy')}
              </strong>

              <strong>{order.user.name}</strong>

              <strong>
                <span>{order.status ? order.status : 'Sem Status'}</span>
              </strong>

              <div>
                <button type="button">Cancelar</button>
              </div>
            </Order>
          ))}
        </ListContainer>
      </ContainerOrders>
    </>
  );
};
export default ListOrders;
