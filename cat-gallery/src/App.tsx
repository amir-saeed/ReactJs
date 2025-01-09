import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './components/Navigation';
import CatGallery from './components/CatGallery';
import UploadCat from './components/UploadCat';
import './styles/App.scss';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Navigation />
        </Header>
        <Content className="content">
          <Routes>
            <Route path="/" element={<CatGallery />} />
            <Route path="/upload" element={<UploadCat />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;