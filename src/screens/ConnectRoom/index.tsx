import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { BarCodeReadEvent } from 'react-native-camera';
import queryString from 'query-string';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


type roomType = {
  name: string;
  id: string;
}

import { Container, Content, ErrorText } from './styles';

const ConnectRoom: React.FC = () => {

  const user = useSelector((state: RootStateOrAny) => state.user);
  const navigation = useNavigation();

  const [connectError, setConnectError] = useState(false);

  function onQRCODEsuccess(qrCode: BarCodeReadEvent){
    console.log(qrCode);
    setConnectError(false);
    const urlParams  = queryString.parseUrl(qrCode.data);
    console.log(urlParams)
    if(urlParams?.query?.link){
      const link = urlParams.query.link;
      if(typeof link === 'string'){
      const roomId = link.split('room')[1];
        database().ref(`/userRooms/${user.uid}`)
          .once('value')
          .then((userRoomsRes: FirebaseDatabaseTypes.DataSnapshot) => {
            const userRooms = userRoomsRes.val();
            if(userRooms){
              const currentRoom = userRooms.find((room:roomType) => room.id === roomId);
              if(currentRoom){
                navigation.navigate('Sala', {id: currentRoom.id, name: currentRoom.name});
              }else {
                database().ref(`/rooms/${roomId}`)
                  .once('value')
                  .then((roomsRes: FirebaseDatabaseTypes.DataSnapshot) => {
                    const roomData = roomsRes.val();
                    if(roomData){
                      database().ref(`/userRooms/${user.uid}`).update([
                        ...userRooms,
                        {
                          name: roomData.name,
                          id: userRoomsRes.ref
                        }
                      ]).then(() => {
                        navigation.navigate('Sala', {id: currentRoom.id, name: currentRoom.name});
                      });
                    } else {
                      setConnectError(true);
                    }
                });
              }
            }
          
        });
      }
    }
  }

  return(
    <Container>
      <Content>
        <QRCodeScanner
          onRead={onQRCODEsuccess}
        />
        {connectError && <ErrorText>Não foi possível conectar. =(</ErrorText>}
      </Content>
    </Container>
    
  )
}

export default ConnectRoom;