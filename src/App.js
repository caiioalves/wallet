import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Wallet from './pages/Wallet';

function App() {
  return (
    <main>
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route path="/carteira" component={ Wallet } />
        </Switch>
      </div>
    </main>
  );
}

export default App;
