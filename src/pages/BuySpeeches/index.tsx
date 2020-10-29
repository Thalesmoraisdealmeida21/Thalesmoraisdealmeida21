import React, { useEffect, useState, useCallback } from 'react';

import { FiPlus, FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import { useCart } from '../../hooks/Cart';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import {
  ItemList,
  Speeches,
  ContainerDashboard,
  AddToCartButton,
} from './style';

interface Course {
  id: string;
  name: string;
  price: number;
}

const AddSpeeche: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { addToCart } = useCart();

  const { user } = useAuth();

  useEffect(() => {
    try {
      api.get<Course[]>('/courses').then(response => {
        setCourses(response.data);
      });
    } catch (err) {
      toast('Ocorreu um erro ao trazer os dados. Por Favor atualize a página', {
        type: 'error',
      });
    }
  }, []);

  const handleAddToMySpeeches = useCallback(
    (course: Course) => {
      try {
        addToCart(course);
      } catch (err) {
        toast('Não foi possivel adicionar a palestra :(', {
          type: 'error',
        });
      }
    },
    [addToCart],
  );

  const addToMyUser = useCallback(
    async idCourse => {
      try {
        await api.post('users/courses', {
          userId: user.id,
          courses: [idCourse],
        });

        toast('Curso adicionado com sucesso', {
          type: 'success',
        });
      } catch {
        //
      }
    },
    [user.id],
  );
  return (
    <>
      <Header position={1} />

      <ContainerDashboard>
        <h1>Comprar Palestras</h1>

        <Speeches>
          {courses?.map(course => {
            return (
              <ItemList key={course.id}>
                <div>
                  <h2>{course.name}</h2>

                  <h3>
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(course.price)}
                  </h3>
                </div>

                <AddToCartButton>
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      type="button"
                      onClick={() => {
                        handleAddToMySpeeches(course);
                      }}
                    >
                      <FiPlus size={20} />
                      <span>Adicionar ao Carrinho</span>
                    </Button>

                    <Button
                      variant="outlined"
                      color="primary"
                      style={{
                        display: `${user.level !== 'ADM' ? 'none' : 'block'}`,
                      }}
                    >
                      <Link to={`/speeche/update/${course.id}`}>
                        <FiEdit size={20} />
                        Editar
                      </Link>
                    </Button>

                    <Button
                      variant="outlined"
                      color="primary"
                      style={{
                        display: `${user.level !== 'ADM' ? 'none' : 'block'}`,
                      }}
                      onClick={() => {
                        addToMyUser(course.id);
                      }}
                    >
                      <FiEdit size={20} />+ usuario
                    </Button>
                  </div>
                </AddToCartButton>
              </ItemList>
            );
          })}
        </Speeches>
      </ContainerDashboard>
    </>
  );
};

export default AddSpeeche;
