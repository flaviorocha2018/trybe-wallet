import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div className="header">
      <div>Hello, TrybeWallet!</div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" Component={ Wallet } />

      </Switch>

    </div>
  );
}

export default App;
