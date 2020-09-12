import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Header from '../../components/header';
import api from '../../services/api';

import {
  ContainerDashboard,
  ContainerVideo,
  VideoContent,
  Descritpion,
} from './style';

interface Video {
  id: string;
  videoLink: string;
  name: string;
  limitAccess: Date;
  description: string;
}
const Dashboard: React.FC = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<Video>({} as Video);

  useEffect(() => {
    async function getDataVideo(): Promise<void> {
      try {
        const response = await api.get<Video>(`/courses/${id}`);
        setVideo(response.data);
      } catch (err) {
        toast('Acesso a palestra expirado', {
          type: 'error',
        });
      }
    }

    getDataVideo();
  }, [id]);
  return (
    <>
      <Header />
      <ContainerDashboard>
        <ContainerVideo>
          <h1>{video?.name}</h1>
          <h2>
            {video ? 'Limite de Acesso' : 'Acesso Expirado'}
            <br />
            {video?.limitAccess
              ? format(new Date(video.limitAccess), "dd/MM/yyyy ' as' hh:mm")
              : ''}
          </h2>
          <VideoContent>
            <ReactPlayer controls url={video?.videoLink} />
          </VideoContent>
        </ContainerVideo>

        <Descritpion>
          <div dangerouslySetInnerHTML={{ __html: video.description }} />
        </Descritpion>
      </ContainerDashboard>
    </>
  );
};

export default Dashboard;
