import React, { useState, useMemo } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector, RootStateOrAny} from 'react-redux';
import database from '@react-native-firebase/database';


import Lindo from '../../components/Lindo';
import Star from '../../assets/star.svg';
import StarStroke from '../../assets/star_stroke.svg';
import TrashCan from '../../assets/recycle-bin.svg';
import { color } from '../../libs/variables';

import { Container, Title, Song, Favorite, DeleteButton } from './styles';

interface onlineUserType{
  lindoIndex: number;
  lindoName: string;
  uid: string;
}

interface song {
  title: string;
  id: string;
  uid: string;
}

interface propsType{
  song: song
} 

const PlaylistSongItem: React.FC<propsType> = ({song}) => {

  const {room, user, favorites} = useSelector((state: RootStateOrAny) => state);

  const [removingAlert, setRemovingAlert] = useState<boolean>(false);
  const [favoriteAlert, setFavoriteAlert] = useState<boolean>(false);
  const [removeFavoriteAlert, setRemoveFavoriteAlert] = useState<boolean>(false);


  function removeSong(){
    setRemovingAlert(true);
  }

  function addFavorite(){
    setFavoriteAlert(true);
  }

  function removeFavorite(){
    setRemoveFavoriteAlert(true);
  }

  function confirmRemovingSong(){
    setRemovingAlert(false);
    console.log(room.songList, song.id);
    const songIndex = room.songList.map(
      (el:song) => (user.uid === el.uid ? el.id : '')).lastIndexOf(song.id);
    if(songIndex > -1){
      database().ref(`/rooms/${room.id}`).update({
        songList: room.songList.filter((item: song, index: number) => index !== songIndex)
      });
    }
  }

  function confirmAddingFavorite(){
    setFavoriteAlert(false);
    database().ref(`/userFavorites/${user.uid}`).set([
      {
        id: song.id,
        title: song.title
      },
      ...favorites.filter((favorite: song) => favorite.id !== song.id)
    ]);
  }

  function confirmRemovingFavorite(){
    setFavoriteAlert(false);
    database().ref(`/userFavorites/${user.uid}`).set([
      ...favorites.filter((favorite: song) => favorite.id !== song.id)
    ]);
  }

  const isFavorite = useMemo(() => {
    const favorite = favorites.find((item: song) => item.id === song.id);
    if(favorite){
      return true;
    } return false;
  }, [favorites]);

  const lindoId = useMemo(() => {
    const currentUser = room.onlineUsers.find((u: onlineUserType) => u.uid === song.uid);
    if(currentUser){
      return currentUser.lindoIndex;
    } return null;
  }, [room]);


  return <Container>
    <Song>
      {!!lindoId && <Lindo index={lindoId}/>}
      <Title>{song.title}</Title>
    </Song>
    <DeleteButton onPress={removeSong}>
      <TrashCan width={25} height={25} fill={color.red}/>
    </DeleteButton>
    <Favorite onPress={isFavorite ? removeFavorite : addFavorite}>
      {isFavorite ? (
        <Star width={25} height={25} fill={color.blue}/>
      ): (
        <StarStroke width={25} height={25} fill={color.blue}/>
      )}
    </Favorite>

    <AwesomeAlert
      show={removingAlert}
      title="Remover"
      message="Tem certeza que deseja remover essa música da playlist?"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Não"
      confirmText="Yes"
      confirmButtonColor={color.red}
      onCancelPressed={() => {
        setRemovingAlert(false);
      }}
      onConfirmPressed={confirmRemovingSong}
      useNativeDriver={true}
      messageStyle={{color: color.blue}}
      titleStyle={{color: color.blue, fontWeight: 'bold'}}
      cancelButtonTextStyle={{fontWeight: 'bold', fontSize: 18}}
      cancelButtonStyle={{marginRight: 20}}
      confirmButtonTextStyle={{fontWeight: 'bold', fontSize: 18}}
    />
   <AwesomeAlert
      show={favoriteAlert}
      title="Favoritos"
      message="Tem certeza que deseja adicionar essa música aos favoritos?"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Não"
      confirmText="Yes"
      confirmButtonColor={color.yellow}
      onCancelPressed={() => {
        setFavoriteAlert(false);
      }}
      onConfirmPressed={confirmAddingFavorite}
      useNativeDriver={true}
      messageStyle={{color: color.blue}}
      titleStyle={{color: color.blue, fontWeight: 'bold'}}
      cancelButtonTextStyle={{fontWeight: 'bold', fontSize: 18}}
      cancelButtonStyle={{marginRight: 20}}
      confirmButtonTextStyle={{fontWeight: 'bold', fontSize: 18}}
    />

    <AwesomeAlert
      show={removeFavoriteAlert}
      title="Favoritos"
      message="Tem certeza que deseja remover essa música aos favoritos?"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Não"
      confirmText="Yes"
      confirmButtonColor={color.red}
      onCancelPressed={() => {
        setRemoveFavoriteAlert(false);
      }}
      onConfirmPressed={confirmRemovingFavorite}
      useNativeDriver={true}
      messageStyle={{color: color.blue}}
      titleStyle={{color: color.blue, fontWeight: 'bold'}}
      cancelButtonTextStyle={{fontWeight: 'bold', fontSize: 18}}
      cancelButtonStyle={{marginRight: 20}}
      confirmButtonTextStyle={{fontWeight: 'bold', fontSize: 18}}
    />
    
  </Container>;
}

export default PlaylistSongItem;