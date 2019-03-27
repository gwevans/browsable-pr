import React, { Component } from 'react';
import ViewPage from './components/ViewPage/ViewPage.jsx';
import Header from './components/Header/Header.jsx';

class App extends Component {
  render() {
    return (
        <>
          <Header />
          <ViewPage />
        </>
    );
  }
}

export default App;
