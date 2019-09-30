import React from 'react';
import Header from '../../Header';
import Calendar from '../../Calendar';

const HomeScreen = () => (
  <div>
    <Header />
    <div className="ui container home">
      <Calendar />
    </div>
  </div>

)

export default HomeScreen;