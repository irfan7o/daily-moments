import { IonButton, IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { auth } from '../firebase';

const NotFoundPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonButton color="danger" expand="block" onClick={() => auth.signOut()}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
