import React, { useState, useCallback } from 'react';
import {
  FiChevronDown,
  FiShoppingCart,
  FiArrowLeft,
  FiTrash,
  FiPlusSquare,
} from 'react-icons/fi';

import { MdAddShoppingCart, MdOndemandVideo } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  Container,
  Content,
  LoginContent,
  MenuContent,
  DropdownContent,
  Menu,
} from './style';
import { useAuth } from '../../hooks/AuthContext';

import { useCart } from '../../hooks/Cart';

import logo from '../../assets/logoRounded.svg';
import profile from '../../assets/profile.jpeg';

interface PositionMenu {
  position?: number;
}

const Header: React.FC<PositionMenu> = ({ position }) => {
  const [dropdownState, setDropdownstate] = useState(false);

  const { user } = useAuth();

  const showDropdown = useCallback(() => {
    setDropdownstate(!dropdownState);
  }, [dropdownState]);

  const { signOut } = useAuth();

  const logout = useCallback(() => {
    signOut();
  }, [signOut]);

  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const { courses } = useCart();

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
  });

  const classes = useStyles();
  const [value, setValue] = useState(position || 0);

  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo" />

        <FiArrowLeft onClick={goBack} size={70} color="white" />

        <MenuContent>
          <ul />
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

          <Link to="/cart">
            <FiShoppingCart size={32} color="#fff" />
            <span>{courses.length}</span>
          </Link>

          <DropdownContent showDrop={dropdownState}>
            <button onClick={logout} type="button">
              Sair
            </button>
          </DropdownContent>
        </LoginContent>
      </Content>

      <Menu>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label="Minhas Palestras"
            onClick={() => {
              history.push('/dashboard');
            }}
            icon={<MdOndemandVideo />}
          />

          <BottomNavigationAction
            onClick={() => {
              history.push('/buy-speeches');
            }}
            label="Comprar Palestras"
            icon={<MdAddShoppingCart />}
          />

          <BottomNavigationAction
            onClick={() => {
              history.push('/add-speeche');
            }}
            label="Nova Palestra"
            icon={<FiPlusSquare />}
          />
        </BottomNavigation>
      </Menu>
    </Container>
  );
};

export default Header;
