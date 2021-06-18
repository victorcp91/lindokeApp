import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSelector, RootStateOrAny } from 'react-redux';

import FavoriteSongItem from '../../components/FavoriteSongItem';

import { SongsList } from './styles';

type songType = {
  id: string;
  title: string;
  uid: string;
}


const Favorites: React.FC = () => {

  const favorites = useSelector((state: RootStateOrAny) => state.favorites);

  const songs = useMemo(() => {
    if(favorites){
      return favorites;
    } return [];
  }, [favorites]);

  return <SongsList>
    {songs.map((song: songType) => (
      <FavoriteSongItem song={song}/>
    ))}
  </SongsList>;

  return <View />;
}

export default Favorites;