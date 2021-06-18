import React, { useState, useCallback, useEffect} from 'react';
import { ScrollView } from 'react-native';

import SongItem from '../SongItem';

import { ArtistButton, ArtistName, SongsList } from './styles';

interface songsType{
  title: string;
  id: string;
} 

interface artistData {
  artist: {
    name: string;
    songs: songsType[];
  },
  opened: string;
  open: (artist: string) => void;
  scrollView: ScrollView|null;
  containerPosition: number|null;
}

const ArtistItem: React.FC<artistData> = ({containerPosition, artist, opened, open, scrollView}) => {

  const [yPosition, setYPosition] = useState<number|null>(null);

  const renderSong= (item: songsType) => (
    <SongItem key={`${item.id}`} song={item}/>
  );

  const openArtist = useCallback(() => {
    if(yPosition && scrollView && containerPosition){
      scrollView.scrollTo({
        y: containerPosition + yPosition,
        animated: true
      });
    }
    open(artist.name);
  }, [yPosition, scrollView, containerPosition]);

  useEffect(() => {
    if(opened !== artist.name){
      setYPosition(null);
    }
  }, []);

  return (<>
      <ArtistButton
        opened={opened === artist.name}
        onPress={openArtist}
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          if(!yPosition){
            setYPosition(layout.y);
          }
        }}
      >
        <ArtistName>{artist.name}</ArtistName>
      </ArtistButton>
      {opened === artist.name && (
        <SongsList>
          {artist.songs.map(song => renderSong(song))}
        </SongsList>
      )}
  </>);
}

export default ArtistItem;