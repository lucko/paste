import { useCallback, useState } from 'react';
import styled from 'styled-components';
import Button from './Button.tsx';

const CloseButton = ({
  setVisible,
}: {
  setVisible: (show: boolean) => void;
}) => {
  const close = useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  return (
    <div
      style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
      }}
    >
      <Button style={{ padding: '5px' }} onClick={close}>
        [X]
      </Button>
    </div>
  );
};

export default function About({
  setVisible,
}: {
  setVisible: (show: boolean) => void;
}) {
  const official = window.location.hostname === 'pastes.dev';
  const [showTos, setShowTos] = useState<boolean>(false);

  if (showTos) {
    return <Tos setVisible={setShowTos} />;
  }

  return (
    <AboutPanel>
      <CloseButton setVisible={setVisible} />
      <BannerContainer>
        <Banner>{'{paste}'}</Banner>
      </BannerContainer>
      <p>
        <b>paste is a simple web app for writing & sharing code</b>. It's a
        different take on conventional pastebin sites like pastebin.com or
        hastebin.
      </p>
      {official && (
        <>
          <p>
            <b>pastes.dev</b> is the official, publicly accessible paste
            instance, and can be used by anyone, subject to the{' '}
            <a
              href="#"
              onClick={e => {
                setShowTos(true);
                e.preventDefault();
              }}
            >
              Terms of Service
            </a>
            .
          </p>
          <p>
            To access pastes.dev programmatically, please use the{' '}
            <a
              href="https://github.com/lucko/paste/blob/master/API.md"
              target="_blank"
            >
              API
            </a>
            . :)
          </p>
          <p>
            Please{' '}
            <b>
              <a
                href="#"
                onClick={e => {
                  setShowTos(true);
                  e.preventDefault();
                }}
              >
                report
              </a>
            </b>{' '}
            illegal, malicious, or abusive content so it can be removed.
          </p>
        </>
      )}
      <p style={{ textAlign: 'center' }}>
        <a href="https://github.com/lucko/paste" target="_blank">
          paste
        </a>{' '}
        is free & open source on GitHub.
        <br />
        Copyright &copy; 2021-{new Date().getFullYear()}{' '}
        <a href="https://github.com/lucko" target="_blank">
          lucko
        </a>{' '}
        & other paste{' '}
        <a
          href="https://github.com/lucko/paste/graphs/contributors"
          target="_blank"
        >
          contributors
        </a>
        .
      </p>
    </AboutPanel>
  );
}

const Tos = ({ setVisible }: { setVisible: (show: boolean) => void }) => {
  return (
    <AboutPanel>
      <CloseButton setVisible={setVisible} />
      <h1>Terms of Service</h1>
      <p>
        Welcome to pastes.dev. By using this service, you agree to the following
        terms:
      </p>
      <ol>
        <li>
          <b>No Illegal Use:</b> You may not use pastes.dev to share, store, or
          distribute any content that is illegal, harmful, or violates any laws
          or regulations.
        </li>
        <li>
          <b>No Malicious Content:</b> Do not upload or share content intended
          to harm others, including but not limited to malware, phishing links,
          or personal data without consent.
        </li>
        <li>
          <b>Content Responsibility:</b> You are solely responsible for the
          content you post. We do not review content and are not liable for what
          users choose to share.
        </li>
        <li>
          <b>Moderation:</b> We reserve the right to remove any content at our
          discretion, and to restrict or terminate access to the service for
          abuse or violations of these terms.
        </li>
        <li>
          <b>No Liability:</b> This service is provided "as is" with no
          warranties. We do not guarantee uptime, data retention, or
          availability.
        </li>
      </ol>
      <p>
        By using pastes.dev, you accept these terms. If you do not agree, please
        do not use the service.
      </p>
      <h2>Reporting Abuse</h2>
      <p>
        If you encounter illegal or malicious content, please report it by email
        to <span>report-abuse@pastes.dev</span>.
      </p>
    </AboutPanel>
  );
};

const AboutPanel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  padding: 10px;
  max-width: 650px;
  max-height: 100vh;
  overflow-y: auto;

  color: ${props => props.theme.primary};
  background-color: ${props => props.theme.secondary};

  span {
    color: ${props => props.theme.logo};
  }
`;

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Banner = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.logo};
  border-radius: 20px;
  font-size: 70px;
  letter-spacing: -5px;
  padding: 10px;
  font-weight: bold;
`;
