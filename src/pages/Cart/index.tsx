import React, { useEffect, useState, useCallback } from 'react';

import { Link } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Header from '../../components/header';
import api from '../../services/api';
import { useCart } from '../../hooks/Cart';
import { ContainerDashboard, ItemCart } from './style';

const Cart: React.FC = () => {
  const { courses, removeTheCart, clearCart } = useCart();
  const [cartItems, setCartItems] = useState(courses);

  useEffect(() => {
    setCartItems(courses);
  }, [courses]);

  const removeCourse = useCallback(
    (id: string) => {
      removeTheCart(id);

      const newCourses = courses.filter(course => course.id !== id);
      console.log(newCourses);

      setCartItems(newCourses);
    },
    [removeTheCart],
  );

  const addCoursesToUser = useCallback(async () => {
    try {
      console.log(cartItems);

      const newItem = cartItems.map(coursToinsert => {
        return { course_id: coursToinsert.id };
      });

      const coursesToInsert = { courses: newItem };

      await api.post('/users/courses', coursesToInsert);

      toast('Registro inserido com sucesso', {
        type: 'success',
      });

      clearCart();
    } catch (err) {
      toast('Voce ja possui as palestras que estão no seu carrinho', {
        type: 'error',
      });
    }
  }, [cartItems]);
  return (
    <>
      <Header />

      <ContainerDashboard>
        <h1>Carrinho</h1>

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

        {/* <strong>Total: R$ 120,0</strong> */}

        {cartItems.length <= 0 ? (
          <h1>O Carrinho esta vazio</h1>
        ) : (
          <button onClick={addCoursesToUser} type="button">
            Finalizar Pedido
          </button>
        )}
      </ContainerDashboard>
    </>
  );
};

export default Cart;
