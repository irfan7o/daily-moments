import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { firestore, storage } from '../firebase';
import { useAuth } from '../auth';
import { useHistory } from 'react-router';
import { url } from 'inspector';

async function savePicture(blobUrl, userId) {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log('saved pictures:', url);
  return url;
}

const AddEntryPage: React.FC = () => {
  const [date, setDate] = useState('');
  const { userId } = useAuth();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>();
  useEffect(() => () => {
    if (pictureUrl.startsWith('blob:')){
      URL.revokeObjectURL(pictureUrl);
    }
  }, [pictureUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      setPictureUrl(pictureUrl);
    }
  };

  const handleSave = async () => {
    const entriesRef = firestore.collection('users').doc(userId).collection('entries');
    const entryData = { date, title, pictureUrl, description };
    if (pictureUrl.startsWith('blob:')) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    const entryRef = await entriesRef.add(entryData);
    console.log('saved:', entryRef.id);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonInput type="date"  value={date} onIonChange={(event) => setDate(event.detail.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title} onIonChange={(event) => setTitle(event.detail.value)}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Pictures</IonLabel><br />
            <input type="file" accept="image/*" ref={fileInputRef} hidden onChange={handleFileChange} />
            <img src={pictureUrl} alt="" style={{cursor: 'pointer'}} onClick={() => fileInputRef.current.click()} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={description} onIonChange={(event) => setDescription(event.detail.value)} />
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>Save</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
