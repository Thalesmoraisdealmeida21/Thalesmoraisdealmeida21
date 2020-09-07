import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import api from '../../services/api';

import { ContainerDashboard } from './style';

interface Video {
  id: string;
  videoLink: string;
  name: string;
  limitAccess: Date;
}
const Dashboard: React.FC = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<Video>();
  useEffect(() => {
    async function getDataVideo(): Promise<void> {
      const response = await api.get<Video>(`/courses/${id}`);

      setVideo(response.data);
    }

    getDataVideo();
  }, [id]);
  return (
    <>
      <Header />
      <ContainerDashboard>
        <h1>{video?.name}</h1>

        <ReactPlayer url={video?.videoLink} />
      </ContainerDashboard>
      Data limite para assistir: {video?.limitAccess}
    </>
  );
};

export default Dashboard;
