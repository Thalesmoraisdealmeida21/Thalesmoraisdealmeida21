/* eslint-disable camelcase */
import React, {
  useCallback,
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from 'react';
import pagarme from 'pagarme';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import Radio from '@material-ui/core/Radio';

import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';

import Input from '../../components/input';
import api from '../../services/api';
import Header from '../../components/header';
import {
  ContainerDashboard,
  CardContainerCheckout,
  InputGroup,
  DetailsPayment,
  PaymentsMethod,
  ContentProfile,
  Section,
  SelectGroup,
  TitleSection,
} from './style';

import { useAuth } from '../../hooks/AuthContext';
import { useCart } from '../../hooks/Cart';

interface TransactionStatus {
  status: string;
  refuse_reason: string;
  amount: number;
  payment_method: string;
  boleto_url: string;
  boleto_expiration_date: Date;
  boleto_barcode: string;
}

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
  cpfCnpj: string;
}
interface CardData {
  card_holder_name: string;
  card_number: string;
  card_cvv: string;
  card_expiration_date: string;
  amount: number;
  user: User;
}

interface Order {
  id: string;
  courses: [
    {
      id: string;
      name: string;
      price: string;
    },
  ];
  total: number;
}

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User>({} as User);
  const [paymentMethod, setPaymentMethod] = useState<string>('creditCard');
  const [orderFound, setOrderFound] = useState<Order>({} as Order);
  const { order } = useParams<{ order: string }>();
  const [cardExpirationDateMonth, setCardExpirationDateMonth] = useState<
    string
  >('00');
  const [cardExpirationDateYear, setCardExpirationDateYear] = useState<string>(
    '00',
  );

  const formRef = useRef<FormHandles>(null);

  const { courses, clearCart } = useCart();
  const history = useHistory();

  useEffect(() => {
    async function getUserData(): Promise<void> {
      const response = await api.get<User>(`users/${user.id}`);
      setUserData(response.data);
      const responseOrder = await api.get<Order>(`orders/${order}`);
      setOrderFound(responseOrder.data);
    }

    getUserData();
  }, [order, user]);

  const handleChangePaymentMethod = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setPaymentMethod(event.target.value);
    },
    [],
  );
  const handlePay = useCallback(
    async ({
      card_cvv,
      card_expiration_date,
      card_holder_name,
      card_number,
      amount,
    }: CardData) => {
      try {
        const coursesIds = courses.map(courseItem => {
          return courseItem.id;
        });

        const client = await pagarme.client.connect({
          api_key: process.env.REACT_APP_PAGARME_ENCRYPTION_KEY,
        });

        // const expirationDate = cardExpirationDateMonth + cardExpirationDateYear;

        const card_hash = await client.security.encrypt({
          card_cvv,
          card_expiration_date:
            cardExpirationDateMonth + cardExpirationDateYear,
          card_holder_name,
          card_number,
        });

        const response = await api.post<TransactionStatus>(
          `/orders/pay/${order}`,
          {
            card_hash: paymentMethod === 'boleto' ? undefined : card_hash,
            amount: amount * 100,
            payment_method: paymentMethod,
            user: userData,
          },
        );
        if (response.data.boleto_url) {
          window.open(response.data.boleto_url);
        }
        alert('Pedido Realizado com sucesso.');

        const dataCourse = { userId: user.id, courses: coursesIds };

        if (response.data.status === 'paid') {
          await api.post('/users/courses', dataCourse);
          toast(
            'Pedido Realizado com sucesso. O curso ja este disponivel para você',
            {
              type: 'success',
            },
          );

          history.push('/dashboard');
          clearCart();
        }

        if (response.data.status === 'waiting_payment') {
          toast(
            'Pedido Realizado com sucesso. Após pagamento seu boleto sera processado em náximo 48 horas',
            {
              type: 'success',
            },
          );
        }
      } catch (err) {
        toast('Ocorreu um erro ao efetuar a transação', {
          type: 'error',
        });
      }
    },
    [
      paymentMethod,
      order,
      userData,
      cardExpirationDateYear,
      cardExpirationDateMonth,
      history,
      clearCart,
      user.id,
      courses,
    ],
  );

  return (
    <>
      <Header position={3} />

      <ContainerDashboard>
        <CardContainerCheckout>
          <Form ref={formRef} onSubmit={handlePay}>
            <ContentProfile>
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

                <Input
                  value={userData.cpfCnpj}
                  label="CPF / CNPJ"
                  name="cpfCnpj"
                  type="text"
                  onChange={evt => {
                    setUserData({
                      ...userData,
                      cpfCnpj: evt.target.value,
                    });
                  }}
                />

                <InputGroup>
                  <Input
                    value={userData.email}
                    label="E-mail"
                    name="email"
                    type="text"
                    onChange={evt => {
                      setUserData({ ...userData, email: evt.target.value });
                    }}
                  />
                  <Input
                    value={userData.cep}
                    label="CEP"
                    name="cep"
                    type="text"
                    onChange={evt => {
                      setUserData({
                        ...userData,
                        cep: evt.target.value,
                      });
                    }}
                  />

                  <Input
                    value={userData.telephone}
                    label="Telefone"
                    name="telephone"
                    type="text"
                    onChange={evt => {
                      setUserData({
                        ...userData,
                        telephone: evt.target.value,
                      });
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
            </ContentProfile>
            <Section>
              <TitleSection>Pagamento</TitleSection>
              <PaymentsMethod>
                Boleto
                <Radio
                  value="boleto"
                  onChange={handleChangePaymentMethod}
                  checked={paymentMethod === 'boleto'}
                />
                Cartão de Crédito{' '}
                <Radio
                  value="creditCard"
                  onChange={handleChangePaymentMethod}
                  checked={paymentMethod === 'creditCard'}
                />
              </PaymentsMethod>
              {paymentMethod === 'creditCard' && (
                <>
                  <Input
                    label="Nome (Igual do Cartão)"
                    id="card_holder_name"
                    name="card_holder_name"
                    type="text"
                  />
                  <Input
                    label="Numero do Cartão"
                    id="card_number"
                    name="card_number"
                    type="number"
                  />
                  <InputGroup>
                    <SelectGroup>
                      <span>Vencimento do Cartão</span>
                      <div>
                        <select
                          placeholder="Mes de Vencimento"
                          onChange={evt => {
                            setCardExpirationDateMonth(evt.target.value);
                          }}
                        >
                          <option>Mes</option>
                          <option value="01">1</option>
                          <option value="02">2</option>
                          <option value="03">3</option>
                          <option value="04">4</option>
                          <option value="05">5</option>
                          <option value="06">6</option>
                          <option value="07">7</option>
                          <option value="08">8</option>
                          <option value="09">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>

                        <select
                          onChange={evt => {
                            setCardExpirationDateYear(evt.target.value);
                          }}
                        >
                          <option>Ano</option>
                          <option value={20}>20</option>
                          <option value={21}>21</option>
                          <option value={22}>22</option>
                          <option value={23}>23</option>
                          <option value={24}>24</option>
                          <option value={25}>25</option>
                          <option value={26}>26</option>
                          <option value={27}>27</option>
                          <option value={28}>28</option>
                          <option value={29}>29</option>
                          <option value={30}>30</option>
                          <option value={31}>31</option>
                        </select>
                      </div>
                    </SelectGroup>

                    <Input
                      label="CVV"
                      id="card_cvv"
                      maxLength={3}
                      name="card_cvv"
                      type="number"
                    />
                  </InputGroup>{' '}
                </>
              )}

              <DetailsPayment>
                <strong>
                  Total a Pagar: <br />
                  <Input
                    id="amount"
                    name="amount"
                    value={Number(orderFound.total)}
                    style={{
                      display: 'none',
                    }}
                    disabled
                  />
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(orderFound.total)}
                </strong>

                <button type="submit">Pagar</button>
              </DetailsPayment>
            </Section>
          </Form>
        </CardContainerCheckout>
      </ContainerDashboard>
    </>
  );
};

export default Checkout;
