
import './App.css';
import React from 'react';
import { Layout } from 'antd';
import Homepage from './containers/Homepage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SignIn from './containers/SignIn';
import CreateEvent from './containers/CreateEvent';
import ShowEvent from './containers/ShowEvent';

function App() {
  return (
    // <Homepage/>
    <Router>
      <Routes>
            <Route element={<SignIn />} path='/'></Route>
            <Route element={<Homepage />} path='/Homepage'></Route>
            <Route element={<CreateEvent />} path='/CreateEvent'></Route>
            <Route element={<ShowEvent />} path='/ShowEvent'></Route>
      </Routes>
    </Router>
  );
}

export default App;
