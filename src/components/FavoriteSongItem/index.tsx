import React, { useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector, RootStateOrAny} from 'react-redux';
import database from '@react-native-firebase/database';

import Star from '../../assets/star.svg';
import { color } from '../../libs/variables';

import { Container, Title, Song, Favorite } from './styles';

interface song {
  title: string;
  id: string;
  uid: string;
}
interface propsType{
  song: song
} 

const FavoriteSongItem: React.FC<propsType> = ({song}) => {

  const {room, user, favorites} = useSelector((state: RootStateOrAny) => state);

  const [addingAlert, setAddingAlert] = useState<boolean>(false);
  const [favoriteAlert, setFavoriteAlert] = useState<boolean>(false);

  function addSong(){
    setAddingAlert(true);
  }

  function removeFavorite(){
    setFavoriteAlert(true);
  }

  function confirmAddingSong(){
    setAddingAlert(false);
    database().ref(`/rooms/${room.id}`).update({
      songList: [
        ...room.songList,
        {
          ...song,
          uid: user.uid
        }
      ]
    });
  }

  function confirmRemovingFavorite(){
    setFavoriteAlert(false);
    database().ref(`/userFavorites/${user.uid}`).set([
      ...favorites.filter((favorite: song) => favorite.id !== song.id)
    ]);
  }


  return <Container>
    <Song onPress={addSong}>
      <Title>{song.title}</Title>
    </Song>
    <Favorite onPress={removeFavorite}>
      <Star width={25} height={25} fill={color.blue}/>
    </Favorite>

    <AwesomeAlert
      show={addingAlert}
      title="Playlist"
      message="Tem certeza que deseja adicionar essa música a playlist?"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Não"
      confirmText="Yes"
      confirmButtonColor={color.yellow}
      onCancelPressed={() => {
        setAddingAlert(false);
      }}
      onConfirmPressed={confirmAddingSong}
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
      message="Tem certeza que deseja remover essa música aos favoritos?"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Não"
      confirmText="Yes"
      confirmButtonColor={color.red}
      onCancelPressed={() => {
        setFavoriteAlert(false);
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

export default FavoriteSongItem;