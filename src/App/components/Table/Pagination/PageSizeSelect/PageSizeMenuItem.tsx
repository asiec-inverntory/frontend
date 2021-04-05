import { useCallback } from 'react';

import { Menu } from 'antd';

import { generatePageSizeLabel } from './PageSizeSelect';

type PageSizeMenuItemPropsType = {
  pageSize: number;
}

const PageSizeMenuItem = ({ pageSize }: PageSizeMenuItemPropsType) => {
  const handleItemClick = useCallback(() => console.log(pageSize), [pageSize]);

  return (
    <Menu.Item onClick={handleItemClick}>
      {generatePageSizeLabel(pageSize)}
    </Menu.Item>
  );
};

export default PageSizeMenuItem;
