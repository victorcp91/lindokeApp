import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';

import ArtistItem from '../ArtistItem';

import { SectionButton, SectionText, ArtistsList } from './styles';

interface songsType{
  title: string;
  id: string;
}

type sectionType = {
  section: string;
  artists: {
    name: string;
    songs: songsType[];
  }[];
  opened: string;
  open: (section: string) => void;
  scrollView: ScrollView|null;
}

type artistType = {
  name: string;
  songs: songsType[];
}

const ArtistsSection: React.FC<sectionType> = ({section, artists, open, opened, scrollView}) => {

  const [yPosition, setYPosition] = useState<number|null>(null);
  const [artistOpened, setArtistOpened] = useState<string>('');

  const renderArtist= useCallback((item: artistType, index: number) => (
    <ArtistItem
      scrollView={scrollView}
      key={`${item.name}-${index}`}
      artist={item} opened={artistOpened}
      open={setArtistOpened}
      containerPosition={yPosition}
    />
  ),[yPosition, artistOpened]);


  const openSection = useCallback(() => {
    if(yPosition && scrollView){
      scrollView.scrollTo({
        y: yPosition, 
        animated: true
      });
    }
    open(section);
  },[section, yPosition]);

  useEffect(() => {
    setArtistOpened('');
  }, [opened]);

  return (
  <>
    {artists.length > 0 && (
      <>
        <SectionButton
          onPress={openSection}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            if(!yPosition){
              setYPosition(layout.y);
            }
          }}
          >
          <SectionText>{section}</SectionText>
        </SectionButton>
        {opened === section && (
          <ArtistsList>
            {artists.map((artist, index) => renderArtist(artist, index))}
          </ArtistsList>
        )}
      </>
    )}
  </>
  );
}

export default ArtistsSection;