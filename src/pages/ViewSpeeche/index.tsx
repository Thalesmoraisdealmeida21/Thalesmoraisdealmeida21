import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Header from '../../components/header';
import api from '../../services/api';

import { ContainerDashboard } from './style';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />

      <ContainerDashboard>
        <h1>Nome da palestra</h1>

        <ReactPlayer url="https://marques-zinho2.wistia.com/medias/sl0ntp98ng" />
      </ContainerDashboard>
    </>
  );
};

export default Dashboard;
