import React, { useState, useCallback, useEffect } from 'react';
import {
  FiChevronDown,
  FiShoppingCart,
  FiArrowLeft,
  FiPlusSquare,
  FiUser,
} from 'react-icons/fi';

import { MdCreate } from 'react-icons/md';

import { MdAddShoppingCart, MdOndemandVideo, MdList } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Menu from '@material-ui/core/Menu';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

// import LinearProgress from '@material-ui/core/LinearProgress';

import MenuItem from '@material-ui/core/MenuItem';
import { Container, Content, LoginContent, UserLogo } from './style';

import { useAuth } from '../../hooks/AuthContext';

import { useCart } from '../../hooks/Cart';

import logo from '../../assets/logoRounded.svg';
// import profile from '../../assets/profile.jpg';

interface PositionMenu {
  position?: number;
}

const Header: React.FC<PositionMenu> = ({ position }) => {
  const { user } = useAuth();

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
  const [statusMenu, setStatusMenu] = useState<null | HTMLElement>(null);
  const [userLogo, setUserLogo] = useState('');

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setStatusMenu(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setStatusMenu(null);
  }, []);

  useEffect(() => {
    const { name } = user;

    const nameArray = name.split(' ');

    let logoToSet = '';
    logoToSet +=
      nameArray[0].substring(0, 1).toUpperCase() +
      nameArray[1].substring(0, 1).toUpperCase();

    setUserLogo(logoToSet);
  }, [user]);

  return (
    <>
      <Container>
        <Content>
          <img src={logo} alt="Logo" />

          <FiArrowLeft onClick={goBack} size={40} color="white" />

          <LoginContent>
            <UserLogo>
              <h1>{userLogo}</h1>
            </UserLogo>
            <div>
              <strong>Bem Vindo</strong>
              <span>{user.name}</span>
            </div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <FiChevronDown size={24} color="#fff" />
            </Button>

            <Link to="/cart">
              <FiShoppingCart size={32} color="#fff" />
              <span>{courses.length}</span>
            </Link>

            <Menu
              anchorEl={statusMenu}
              keepMounted
              open={Boolean(statusMenu)}
              onClose={handleClose}
              style={{ scrollMarginBottom: 'hidden', position: 'absolute' }}
            >
              <MenuItem
                onClick={() => {
                  history.push('/profile');
                }}
              >
                Perfil
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </LoginContent>
        </Content>

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
            style={{
              display: `${user.level !== 'ADM' ? 'none' : 'block'}`,
            }}
            onClick={() => {
              history.push('/add-speeche');
            }}
            label="Nova Palestra"
            icon={<FiPlusSquare />}
          />

          <BottomNavigationAction
            style={{
              display: `${user.level !== 'ADM' ? 'none' : 'block'}`,
            }}
            onClick={() => {
              history.push('/users');
            }}
            label="Usuários"
            icon={<FiUser />}
          />
          {/* 
          <BottomNavigationAction
            style={{
              display: `${user.level !== 'ADM' ? 'none' : 'block'}`,
            }}
            onClick={() => {
              history.push('/posts');
            }}
            label="Postagens"
            icon={<MdCreate />}
          /> */}

          {/* <BottomNavigationAction
            style={{
              display: `${user.level !== 'ADM' ? 'none' : 'block'}`,
            }}
            onClick={() => {
              history.push('/orders');
            }}
            label="Pedidos"
            icon={<MdList />}
          /> */}
        </BottomNavigation>
      </Container>
    </>
  );
};

export default Header;
