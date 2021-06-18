import React, { useMemo } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';

import PlaylistSongItem from '../../components/PlaylistSongItem';

import { SongsList } from './styles';

type songType = {
  id: string;
  title: string;
  uid: string;
}

const Playlist: React.FC = () => {

  const room = useSelector((state: RootStateOrAny) => state.room);

  const songs = useMemo(() => {
    if(room && room.songList){
      return room.songList;
    } return [];
  }, [room]);

  return <SongsList>
    {songs.map((song: songType) => (
      <PlaylistSongItem song={song}/>
    ))}
  </SongsList>;
}

export default Playlist;