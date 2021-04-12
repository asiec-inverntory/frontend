import { Button as AntButton } from 'antd';
import styled from 'styled-components';

export const ButtonContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const IconsContainer = styled.div`
  span {
    color: rgba(0, 0, 0, 0.85);
    font-size: 20px;

    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
  }

  span:hover {
    color: #40a9ff;
  }

  span:first-child {
    margin-right: 18px;
  }
`;

export const Button = styled(AntButton)`
  cursor: default;

  pointer-events: none;

  ${IconsContainer} {
    pointer-events: all;
  }

  &:hover {
    border-color: #d9d9d9;
  }
`;
