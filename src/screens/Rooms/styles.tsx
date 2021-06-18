
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { color } from '../../libs/variables';

interface Room {
  id: string;
  name: string;
}

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${color.lightGray};
`;

export const RoomsList= styled(FlatList as new () => FlatList<Room>)`
  flex: 1;
  background-color: ${color.lightGray};
  margin-bottom: 10px;
`;

export const CreateRoom = styled.TouchableOpacity`
  background-color: ${color.yellow};
  padding: 10px 25px;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

export const CreateRoomText = styled.Text`
  color: ${color.blue};
  font-weight: bold;
  font-size: 18px;
`;