import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-width: 700px;
  margin: 24px 16px 24px 0;

  .ant-table-cell {
    border-color: #e5e7ec !important;
  }

  .ant-table {
    border: 1px solid #e5e7ec;
    border-radius: 8px;
  }

  .ant-table-row:last-child > .ant-table-cell {
    border-bottom: none;
  }

  .ant-table-thead > tr > th {
    font-weight: 600;

    background: none;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: none;
  }
`;
