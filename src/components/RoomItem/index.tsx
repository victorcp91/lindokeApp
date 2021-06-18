import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Title } from './styles';

type roomData = {
  room: {
    name: string;
    id: string;
  };
}

const RoomItem : React.FC<roomData> = ({room}) => {

  const navigation = useNavigation();

  function goToRoom(){
    navigation.navigate('Sala', {id: room.id, name: room.name})
  }

  return <Container onPress={goToRoom}>
    <Title>{room.name}</Title>
  </Container>;
}

export default RoomItem;