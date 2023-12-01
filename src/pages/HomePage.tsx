import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { auth, firestore } from '../firebase';
import React, { useEffect, useState } from 'react';
import { Entry, toEntry } from '../models';
import { useAuth } from '../auth';
import {add as addIcon} from 'ionicons/icons';
import { formatDate } from '../date';

const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef = firestore.collection('users').doc(userId)
    .collection('entries');
    return entriesRef.orderBy('date', 'desc').limit(20).onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map((entry) =>
          <IonItem button key={entry.id} routerLink={`/my/entries/view/${entry.id}`}>
            <IonThumbnail slot="end">
              <IonImg src={entry.pictureUrl} />
            </IonThumbnail>
            <IonLabel>
            <h5>{formatDate(entry.date)}</h5>
            <h2>{entry.title}</h2>
            </IonLabel>
          </IonItem>)}
        </IonList>
        <IonFab vertical='bottom' horizontal='end'>
          <IonFabButton routerLink='/my/entries/add'>
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
