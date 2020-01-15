import React from 'react';
import {
  IonIcon,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent
} from '@ionic/react';
import { useAuthService } from '../contexts/Auth';
import { useVaultService } from '../contexts/Vault';
import { AuthMode } from '@ionic-enterprise/identity-vault';

const About: React.FC = () => {
  const authService = useAuthService();
  const vaultService = useVaultService();
  return (
    <IonPage id="about-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>About</IonTitle>
          <IonButtons slot="primary">
            <IonButton slot="icon-only" onClick={authService.logout}>
              <IonIcon name="log-out"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>

      </IonHeader>
      <IonContent class="ion-text-center ion-padding">
        <img alt="app icon" src="assets/icon/appicon.svg" style={{"height": "100px"}}/>
        <h1>Ionic Identity Vault</h1>
        <h2>Demo Application</h2>
        <h3>Identity Vault Version 3.5.1</h3>
        <h4>Authentication Mode: { AuthMode[vaultService.authMode] }</h4>
        <h4>Biometrics Type: { <span style={{"textTransform": "capitalize"}}>{vaultService.biometricType}</span> }</h4>
        <h3>
          Current User: {
            authService.user === undefined ? "User is undefined" : `Email: ${authService.user.email} UserID: ${authService.user.id}`
          }
        </h3>
      </IonContent>
    </IonPage>
  );
};

export default About;
