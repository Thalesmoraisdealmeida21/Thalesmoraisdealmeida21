import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { toast } from 'react-toastify';

interface Course {
  id: string;
  name: string;
  price: number;
}

interface CartContext {
  courses: Course[];
  addToCart(item: Course): void;
  removeTheCart(id: string): void;
  clearCart(): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const productsFromLocalStorage = localStorage.getItem('@ELearned:Cart');

    if (productsFromLocalStorage) {
      setCourses([...JSON.parse(productsFromLocalStorage)]);
    }
  }, []);

  const addToCart = useCallback(
    async (courseForInsert: Course) => {
      const alreadyExists = courses.filter(
        crs => crs.id === courseForInsert.id,
      );

      if (alreadyExists.length > 0) {
        toast('Esta palestra ja está no seu carrinho', {
          type: 'error',
        });
      } else {
        const newCourses = [...courses, courseForInsert];

        setCourses(newCourses);

        localStorage.setItem('@ELearned:Cart', JSON.stringify(newCourses));
        toast('Palestra adicionado as minhas palestras com sucesso', {
          type: 'success',
        });
      }
    },
    [courses],
  );

  const removeTheCart = useCallback(
    id => {
      const newCourses = courses.filter(cour => cour.id !== id);

      setCourses(newCourses);

      localStorage.setItem('@ELearned:Cart', JSON.stringify(newCourses));

      toast('Item removido do carrinho com sucesso', {
        type: 'info',
      });
    },
    [courses],
  );

  const clearCart = useCallback(() => {
    setCourses([]);
  }, []);

  const value = React.useMemo(
    () => ({ clearCart, addToCart, removeTheCart, courses }),
    [addToCart, removeTheCart, courses, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
