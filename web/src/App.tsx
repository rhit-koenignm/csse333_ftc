import React from 'react';
import { renderRoutes } from 'react-router-config';

import routes from './routes';
import logo from './logo.svg';
import styles from './App.module.scss';
import NavbarComponent from './components/Navbar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className={styles["app-header"]}>
          <NavbarComponent />
        </header>
        {renderRoutes(routes)}
      </div>
    );
  }
}

export default App;
