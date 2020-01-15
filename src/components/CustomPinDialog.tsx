import React, { useState } from 'react';
import {
  IonLabel,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
} from '@ionic/react';
import { observer } from 'mobx-react-lite';
import { useVaultService } from '../contexts/Vault';
import { PinMode } from '../services';

import './CustomPinDialog.scss';
import { close } from 'ionicons/icons';


const CustomPinDialog: React.FC = observer(() => {

  const vaultService = useVaultService();

  const [verifyPin, setVerifyPin] = useState('');
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let displayPin = '*'.repeat(pin.length);

  const inputDisabled = pin.length > 8;

  function enter() {
    switch(vaultService.pinMode) {
      case PinMode.Unlock:
        vaultService.pin = pin;
        vaultService.pinMode = PinMode.Dismiss;
        break;
      case PinMode.Verify:
        if (verifyPin === pin) {
          vaultService.pin = pin;
          vaultService.pinMode = PinMode.Dismiss;
        } else {
          setErrorMessage('The pins do not match');
          vaultService.pinMode = PinMode.New;
        }
        break;
      case PinMode.New:
        setVerifyPin(pin);
        vaultService.pinMode = PinMode.Verify;
        break;
    }
    setPin('');
  }

  function append(n: number) {
    setErrorMessage('');
    setPin(pin + (n.toString()));
  }

  let prompt, title;
  if (vaultService.pinMode === PinMode.New) {
    prompt = 'Create Session PIN';
    title = 'Create PIN';
  } else if (vaultService.pinMode === PinMode.Unlock) {
    prompt = 'Enter PIN to Unlock';
    title = 'Unlock';
  } else if (vaultService.pinMode === PinMode.Verify) {
    prompt = 'Verify PIN';
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{title}</IonTitle>
          {
            vaultService.pinMode === PinMode.New &&
            <IonButtons slot="primary">
              <IonButton
                slot="icon-only"
                onClick={() => vaultService.pinMode = PinMode.Dismiss}>
                <IonIcon icon={close}></IonIcon>
              </IonButton>
            </IonButtons>
          }
        </IonToolbar>

      </IonHeader>
      <IonContent class="ion-padding">
        <IonLabel class="ion-text-center">
          <div className="prompt">{prompt}</div>
        </IonLabel>
        <IonLabel class="ion-text-center">
          <div className="pin">{displayPin}</div>
        </IonLabel>
        <IonLabel class="ion-text-center" color="danger">
          <div className="error">{errorMessage}</div>
        </IonLabel>
      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonRow>
            {
              [1, 2, 3].map(n => (
                <IonCol key={n}>
                  <IonButton expand="block" onClick={() => append(n)} disabled={inputDisabled}>
                    {n}
                  </IonButton>
                </IonCol>
              ))
            }
          </IonRow>
          <IonRow>
            {
              [4, 5, 6].map(n => (
                <IonCol key={n}>
                  <IonButton expand="block" onClick={() => append(n)} disabled={inputDisabled}>
                    {n}
                  </IonButton>
                </IonCol>
              ))
            }
          </IonRow>
          <IonRow>
            {
              [7, 8, 9].map(n => (
                <IonCol key={n}>
                  <IonButton expand="block" onClick={() => append(n)} disabled={inputDisabled}>
                    {n}
                  </IonButton>
                </IonCol>
              ))
            }
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton color="tertiary" expand="block" onClick={() => setPin(pin.slice(0, -1))} disabled={!pin.length}>
                Delete
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={() => append(0)} disabled={pin.length > 8}>
                0
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="secondary" expand="block" onClick={enter} disabled={pin.length < 3}>
                Enter
            </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
});

export default CustomPinDialog;
