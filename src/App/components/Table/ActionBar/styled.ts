import styled from 'styled-components';

export const ActionBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px;

  background: white;

  border: 1px solid #e5e7ec;
  border-bottom: none;
  border-radius: 16px 16px 0 0;

  > button {
    margin-right: 16px;
  }
`;
