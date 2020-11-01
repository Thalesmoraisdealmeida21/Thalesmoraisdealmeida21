import React, { useEffect, useState, useCallback } from 'react';
import { MdVisibility, MdClear } from 'react-icons/md';
import { toast } from 'react-toastify';
import Header from '../../../components/header';
import api from '../../../services/api';

import {
  ContainerMyOrders,
  Title,
  Content,
  Card,
  ColumnTable,
  LabelSpan,
  Modal,
  ModalContent,
  Close,
} from './styles';

interface Order {
  id: string;
  status: string;
  numero: number;
  total: number;
}

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  useEffect(() => {
    try {
      api.get<Order[]>('/users/myorders').then(resp => {
        setOrders(resp.data);
      });
    } catch {
      toast('Ocorreu ume erro ao realizar a transaçao', {
        type: 'error',
      });
    }
  }, []);

  return (
    <>
      <Header />

      <Modal isOpen={openModal}>
        <ModalContent>
          <Close onClick={handleOpenModal}>
            <MdClear />
          </Close>
          <h1>Cursos Modal</h1>
        </ModalContent>
      </Modal>

      <ContainerMyOrders>
        <Content>
          <Title>Meus Pedidos</Title>

          {/* <HeaderTable>
            <ul>
              <li> Pedido</li>
              <li>Valor</li>
              <li> Status</li>
              <li style={{ marginLeft: '180px' }}>Opções</li>
            </ul>
          </HeaderTable> */}

          {orders.map(order => {
            return (
              <>
                <Card>
                  <ColumnTable>
                    <span>{order.numero}</span>
                  </ColumnTable>

                  <ColumnTable style={{ width: '200px' }}>
                    <span>
                      {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(order.total)}
                    </span>
                  </ColumnTable>

                  <ColumnTable>
                    <LabelSpan
                      colorBg={order.status === 'paid' ? '#42BD14' : '#db6923'}
                    >
                      <span>
                        {order.status === 'paid'
                          ? 'Pago'
                          : 'Aguardando Pagamento'}
                      </span>
                    </LabelSpan>
                  </ColumnTable>

                  <ColumnTable
                    style={{ marginLeft: 'auto', marginRight: '200px' }}
                  >
                    <button onClick={handleOpenModal} type="button">
                      <MdVisibility />
                      <span>Visualizar Cursos</span>
                    </button>
                  </ColumnTable>
                </Card>
              </>
            );
          })}
        </Content>
      </ContainerMyOrders>
    </>
  );
};

export default MyOrders;
