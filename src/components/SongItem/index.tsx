import React, { useState, useMemo } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector, RootStateOrAny} from 'react-redux';
import database from '@react-native-firebase/database';


import Star from '../../assets/star.svg';
import StarStroke from '../../assets/star_stroke.svg';
import { color } from '../../libs/variables';


import { Container, Title, Song, Favorite } from './styles';

interface song {
  title: string;
  id: string;
  uid: string;
}

interface propsType{
  song: song;
  deletable: boolean;
} 

const SongItem: React.FC<propsType> = ({song, deletable }) => {

  const {room, user, favorites} = useSelector((state: RootStateOrAny) => state);

  const [playlistAlert, setPlaylistAlert] = useState<boolean>(false);
  const [favoriteAlert, setFavoriteAlert] = useState<boolean>(false);
  const [removeFavoriteAlert, setRemoveFavoriteAlert] = useState<boolean>(false);


  function selectSong(){
    setPlaylistAlert(true);
  }

  function addToFavorites(){
    setFavoriteAlert(true);
  }

  function removeFavorite(){
    setRemoveFavoriteAlert(true);
  }

  function confirmAddingFavorite(){
    setFavoriteAlert(false);
    database().ref(`/userFavorites/${user.uid}`).set([
      {...song},
      ...favorites.filter((favorite: song) => favorite.id !== song.id)
    ]);
  }

  function confirmRemovingFavorite(){
    setFavoriteAlert(false);
    database().ref(`/userFavorites/${user.uid}`).set([
      ...favorites.filter((favorite: song) => favorite.id !== song.id)
    ]);
  }

  function confirmAddingSong(){
    setPlaylistAlert(false);
    database().ref(`/rooms/${room.id}`).update(room.songList ? {
      songList: [
        ...room.songList,
        {
          ...song,
          uid: user.uid
        },
      ]
    }: {
      songList: [
        {
          ...song,
          uid: user.uid
        },
      ]
    });
  }

  const isFavorite = useMemo(() => {
    const favorite = favorites.find((item: song) => item.id === song.id);
    if(favorite){
      return true;
    } return false;
  }, [favorites])

  return <Container>
    <Song onPress={selectSong}>
      <Title>{song.title}</Title>
    </Song>
    <Favorite onPress={isFavorite ? removeFavorite : addToFavorites}>
      {isFavorite ? (
        <Star width={25} height={25} fill={color.blue}/>
      ): (
        <StarStroke width={25} height={25} fill={color.blue}/>
      )}
    </Favorite>
    <AwesomeAlert
      show={playlistAlert}
      title="Playlist"
      message="Tem certeza que deseja adicionar essa música a playlist"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Não"
      confirmText="Yes"
      confirmButtonColor={color.yellow}
      onCancelPressed={() => {
        setPlaylistAlert(false);
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

export default SongItem;