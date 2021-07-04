import React, { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, RootStateOrAny } from 'react-redux';
import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';

import { color } from '../../libs/variables';
import RoomItem from '../../components/RoomItem';
import QRCodeIcon from '../../assets/qr-code.svg';

import { Container, Content, RoomsList, CreateRoom, CreateRoomText } from './styles';

interface Room {
  id: string;
  name: string;
}

const Rooms: React.FC = () => {

  const navigation = useNavigation();
  const user = useSelector((state: RootStateOrAny) => state.user);

  const [rooms, setRooms] = useState<Room[]>([]);

  function onResult(snapshot:FirebaseDatabaseTypes.DataSnapshot){
    const value = snapshot.val();
    if(value){
      const myRooms = value.map((room: Room) => ({
        id: room.id,
        name: room.name
      }));
      setRooms(myRooms);
    }
  }

  useEffect(() => {
    const handler = database().ref(`/userRooms/${user.uid}`).on('value', onResult);
    
    return () => database().ref(`/userRooms/${user.uid}`).off('value',handler);
  }, []);

  const renderRoom= (item: Room) => (
    <RoomItem room={item}/>
  )

  function goToConnectScreen(){
    navigation.navigate('ConectarSala');
  };
  
  return (
    <Container>
      <Content>
        <RoomsList
          data={rooms}
          renderItem={({item}) => renderRoom(item)}
          keyExtractor={item => item.id}
        ></RoomsList>
        <CreateRoom onPress={goToConnectScreen}>
          <QRCodeIcon width={30} height={30} fill={color.blue}/>
          <CreateRoomText>
            Conectar sala
          </CreateRoomText>
        </CreateRoom>
      </Content>
    </Container>
  );
}

export default Rooms;