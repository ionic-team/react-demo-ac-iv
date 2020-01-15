import React from 'react';
import { Route, Redirect } from "react-router-dom";
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { home, informationCircle, switcher } from 'ionicons/icons';
import Home from './Home';
import About from './About';
import Settings from './Settings';


const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/tabs/home" render={() => <Home/>} exact={true} />
      <Route path="/tabs/about" component={About} exact={true} />
      <Route path="/tabs/settings" component={Settings} exact={true} />
      <Route path="/tabs" render={() => <Redirect to="/tabs/home" />} exact={true} />
      <Route path="/" render={() => <Redirect to="/tabs/home" />} exact={true} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/tabs/home">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="about" href="/tabs/about">
        <IonIcon icon={informationCircle} />
        <IonLabel>About</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/tabs/settings">
        <IonIcon icon={switcher} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;

