import React, {useState} from 'react';
import { NativeSyntheticEvent,TextInputChangeEventData } from 'react-native';
import { useSelector, RootStateOrAny } from 'react-redux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { Container,Content, Name, Create, CreateText } from './styles';

const CreateRoom: React.FC = () => {

  const [roomName, setRoomName] = useState<string>('');
  const user = useSelector((state: RootStateOrAny) => state.user);

  function createRoom(){
    const uid = auth().currentUser?.uid;
    const roomRef = database().ref('/rooms').push();
    roomRef.set({
      name: roomName,
      creator: uid,
      songList: [],
      cancelSong: false,
      onlineUsers:[]
    }).then(() => {
      database().ref(`/userRooms/${user.uid}`).once('value').then(snapshot => {
        const currentData = snapshot.val();
        database().ref(`/userRooms/${user.uid}`).set(currentData ? [
          {
            name: roomName,
            id: roomRef.key
          }, 
          ...currentData
        ] :
        [
          {
            name: roomName,
            id: roomRef.key
          }
        ]);
      });
    });
  }

  function onChangeName(e: NativeSyntheticEvent<TextInputChangeEventData>):void {
    const value = e.nativeEvent.text;
    setRoomName(value);
  }

  return (
    <Container>
      <Content>
        <Name value={roomName} onChange={onChangeName} placeholder="Nome da sala"/>
        <Create onPress={createRoom}>
          <CreateText>Criar</CreateText>
        </Create>
      </Content>
    </Container>
  );
}

export default CreateRoom;