import React, { useCallback, useState } from 'react';

import { MdClear, MdSend } from 'react-icons/md';
import {
  Container,
  ContainerInput,
  BoxAnswer,
  MessageBox,
  TellWhats,
  CollapseDiv,
  Close,
} from './style';

const Header: React.FC = () => {
  const [showBoxMessage, setShowBoxMessage] = useState(true);

  const [textMessage, setTextMessage] = useState('');

  const handleShowBox = useCallback(() => {
    setShowBoxMessage(!showBoxMessage);
  }, [showBoxMessage]);
  return (
    <>
      <Container>
        <TellWhats showDrop={showBoxMessage}>
          <CollapseDiv showDrop={showBoxMessage}>
            <Close>
              <MdClear size={24} onClick={handleShowBox} />
            </Close>

            <BoxAnswer>
              <p>
                A gente tá aqui para te ajudar. Pergunte-nos qualquer coisa aqui
                mesmo, pelo whats!
              </p>
              <MessageBox>
                <span>Oi, tudo bem ?</span>
              </MessageBox>
            </BoxAnswer>

            <ContainerInput>
              <input
                onChange={evt => {
                  setTextMessage(evt.target.value);
                }}
                onKeyDown={evt => {
                  if (evt.key === 'Enter') {
                    window.open(
                      `https://api.whatsapp.com/send?phone=5562981933699&text=${textMessage}`,
                    );
                  }
                }}
                type="text"
                placeholder="Digite sua dúvida"
              />

              <a
                target="__blank"
                href={`https://api.whatsapp.com/send?phone=5562981933699&text=${textMessage}`}
              >
                <MdSend size={16} />
              </a>
            </ContainerInput>
          </CollapseDiv>

          <button
            type="button"
            onClick={() => {
              handleShowBox();
            }}
          >
            Chama no Whatsapp
          </button>
        </TellWhats>
      </Container>
    </>
  );
};

export default Header;
