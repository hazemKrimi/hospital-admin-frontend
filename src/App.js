import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Patients from './pages/Patients';
import Nav from './components/Nav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Rendezvous from './pages/Rendezvous';
import Ordonnances from './pages/Ordonnances';
import MainContextProvider from './contexts/MainContext';

const App = () => {
  return (
    <MainContextProvider>
      <Nav />
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/signup' exact>
          <Signup />
        </Route>
        <Route path='/patients' exact>
          <Patients />
        </Route>
        <Route path='/rdv' exact>
          <Rendezvous />
        </Route>
        <Route path='/ordonnances' exact>
          <Ordonnances />
        </Route>
      </Switch>
    </MainContextProvider>
  )
}

export default App;
