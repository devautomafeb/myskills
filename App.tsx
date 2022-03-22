import React from 'react';

import { Home } from './src/Home'

import {
  StatusBar
} from 'react-native';


const App = () => {

  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        translucent 
        backgroundColor="#5454545d" 
      />
      <Home />
    </>
  )

};

export default App;
