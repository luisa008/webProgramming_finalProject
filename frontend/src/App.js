
import './App.css';
import React from 'react';
import { Layout } from 'antd';
import Homepage from './containers/Homepage';
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Homepage/>
  );
}

export default App;
