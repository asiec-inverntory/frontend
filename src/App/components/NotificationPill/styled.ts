import styled from 'styled-components';

export const Notification = styled.div`
  position: fixed;
  bottom: 24px;
  left: 0;

  z-index: 18;

  display: flex;

  width: 100vw;

  pointer-events: none;

  &.notification-pill-enter {
    transform: translateY(-16px);
    opacity: 0;
  }

  &.notification-pill-enter-active {
    transform: translateY(0);

    opacity: 1;

    transition: 350ms ease;
  }

  &.notification-pill-exit {
    transform: translateY(16px);

    opacity: 0;

    transition: 350ms ease;
  }
`;

export const ContentContainer = styled.div`
  margin: 0 auto;

  padding: 20px 24px 24px 24px;

  background-color: #fff;
  border-radius: 4px;

  box-shadow: 0 20px 25px rgba(27, 33, 38, 0.2);

  pointer-events: all;
`;
