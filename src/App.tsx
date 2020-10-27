import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';
import { CartProvider } from './hooks/Cart';
import Footer from './components/footer';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes />
            <Footer />
          </CartProvider>
        </AuthProvider>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>

      <GlobalStyle />
    </>
  );
};

export default App;
