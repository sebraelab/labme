import React from 'react';
import { Route } from 'react-router-dom';
import HomeScreen from './components/pages/Home/HomeScreen';
import LoginScreen from './components/pages/Login/LoginScreen';

const App = () => (
  <div>
    <Route path="/login" exact component={LoginScreen} />
    <Route path="/" exact component={HomeScreen} />
  </div>
)

export default App;