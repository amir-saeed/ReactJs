import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, UploadOutlined } from '@ant-design/icons';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">Gallery</Link>
      </Menu.Item>
      <Menu.Item key="/upload" icon={<UploadOutlined />}>
        <Link to="/upload">Upload Cat</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;