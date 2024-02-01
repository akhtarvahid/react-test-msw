import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeroTitle from './components/heroText/heroTitle';

function App() {
  return (
    <div className="App" data-testid="app">
      
      <HeroTitle title="Hero Title" />
    </div>
  );
}

export default App;
