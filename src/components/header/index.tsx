import React, { useState, useCallback } from 'react';
import {
  FiChevronDown,
  FiShoppingCart,
  FiPlayCircle,
  FiArrowDownRight,
  FiArrowLeft,
} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  Content,
  LoginContent,
  MenuContent,
  DropdownContent,
} from './style';
import { useAuth } from '../../hooks/AuthContext';

import logo from '../../assets/logoRounded.svg';
import profile from '../../assets/profile.jpeg';

const Header: React.FC = () => {
  const [dropdownState, setDropdownstate] = useState(false);

  const { user } = useAuth();

  const showDropdown = useCallback(() => {
    setDropdownstate(!dropdownState);
  }, [dropdownState]);

  const { signOut } = useAuth();

  const logout = useCallback(() => {
    console.log('sign out');
    signOut();
  }, [signOut]);

  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo" />

        <FiArrowLeft onClick={goBack} size={70} color="white" />

        <MenuContent>
          <ul>
            <li>
              <Link to="/add-speeche">Novao Palestra</Link>
            </li>

            <li>
              <Link to="/add-speeche">MInhas Palestras</Link>
            </li>

            <li>
              <Link to="/add-speeche">Comprar Palestras</Link>
            </li>
          </ul>
        </MenuContent>

        <LoginContent>
          <img src={profile} alt="profile" />
          <div>
            <strong>Bem Vindo</strong>
            <span>{user.name}</span>
          </div>
          <button type="button" onClick={showDropdown}>
            <FiChevronDown size={24} color="#fff" />
          </button>

          <FiShoppingCart size={32} color="#fff" />
          <span>3</span>
          <DropdownContent showDrop={dropdownState}>
            <ul>
              <li>
                <button type="button">Perfil</button>
              </li>
              <button onClick={logout} type="button">
                Sair
              </button>
            </ul>
          </DropdownContent>
        </LoginContent>
      </Content>
    </Container>
  );
};

export default Header;
