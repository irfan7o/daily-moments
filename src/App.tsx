import { IonApp, IonLoading } from '@ionic/react';
import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { AuthContext, useAuthInit } from './auth';
import AppTabs from './AppTabs';
import NotFoundPage from './pages/SettingsPage';
import { auth } from './firebase';
import RegisterPage from './pages/RegisterPage';

auth.onAuthStateChanged((user) => {
  console.log('onAuthStateChanged:', user);
});

const App: React.FC = () => {
  const {loading, auth}= useAuthInit();
  if(loading){
    return <IonLoading isOpen />
  }
  console.log(`rendering App with auth:`, auth);
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
      <IonReactRouter>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route path="/my">
            <AppTabs />
          </Route>
          <Redirect exact path="/" to="/my/entries" />
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
