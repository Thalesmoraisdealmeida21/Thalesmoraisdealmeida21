/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState, useCallback } from 'react';

import { FiTrash } from 'react-icons/fi';

import { useHistory } from 'react-router-dom';
import Header from '../../components/header';
import api from '../../services/api';
import { useCart } from '../../hooks/Cart';
import {
  ContainerDashboard,
  ItemCart,
  CardCart,
  HeaderItemsCart,
  DataCart,
} from './style';
import { useAuth } from '../../hooks/AuthContext';

const Cart: React.FC = () => {
  const { courses, removeTheCart } = useCart();
  const [cartItems, setCartItems] = useState(courses);
  const [totalCart, setTotalCart] = useState<number>(0);

  const history = useHistory();

  const { user } = useAuth();

  useEffect(() => {
    setCartItems(courses);

    let total = 0;

    // eslint-disable-next-line array-callback-return
    courses.map(item => {
      total += Number(item.price);
    });

    setTotalCart(total);

    console.log(total);
  }, [courses, totalCart]);

  interface Order {
    id: string;
  }

  const handleCreateOrder = useCallback(async () => {
    const coursesIds = courses.map(courseItem => {
      return courseItem.id;
    });

    const userId = user.id;

    const data = { userId, courses: coursesIds };

    const response = await api.post<Order>('orders', data);

    history.push(`/checkout/${response.data.id}`);
  }, [history, courses, user]);

  const removeCourse = useCallback(
    (id: string) => {
      removeTheCart(id);

      const newCourses = courses.filter(course => course.id !== id);

      setCartItems(newCourses);
    },
    [courses, removeTheCart],
  );

  return (
    <>
      <Header position={3} />

      <ContainerDashboard>
        <CardCart>
          <HeaderItemsCart>
            <h1>Carrinho</h1>
          </HeaderItemsCart>
          {cartItems.map(course => (
            <ItemCart key={course.id}>
              <h2>{course.name}</h2>

              <h2>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(course.price)}
              </h2>
              <FiTrash
                onClick={() => {
                  removeCourse(course.id);
                }}
                size={25}
              />
            </ItemCart>
          ))}

          {cartItems.length <= 0 ? (
            <h1>O Carrinho esta vazio</h1>
          ) : (
            <DataCart>
              <strong>Total: </strong>
              <span>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalCart)}
              </span>

              <button onClick={handleCreateOrder} type="button">
                Finalizar Pedido
              </button>
            </DataCart>
          )}
        </CardCart>
      </ContainerDashboard>
    </>
  );
};

export default Cart;
