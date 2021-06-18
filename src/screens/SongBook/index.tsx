import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import api from '../../libs/api';

import ArtistsSection from '../../components/ArtistsSection';

import { setSongbook } from '../../store/actions/songbook';

import { SectionsContainer } from './styles';


interface songsType{
  title: string;
  id: string;
}

interface artistsType{
  name: string;
  songs: songsType[];
}

const categories = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7', '8', '9'];

const SongBook: React.FC = () => {
  const [data, setData] = useState<artistsType[]>([]);
  const [opened, setOpened] = useState<string>('');
  const [ref, setRef] = useState<ScrollView|null>(null);

  const dispatch =  useDispatch();

  const book = useSelector((state: RootStateOrAny) => state.songbook);

  useEffect(() => {
    (async function getData(){
      const currentArtists = await api.getSongBook();
      dispatch(setSongbook(currentArtists));
    })();
  }, []);

  const artists = useMemo(() => {
    const result: artistsType[][] = [];
    categories.forEach((letter, index) => {
      if(book.filter){
        result[index] = book.filter((artist:artistsType) => artist.name[0] === letter);
      }
    });
    return result;
  },[book]);

  return (
    <SectionsContainer ref={currentRef => setRef(currentRef)}>
      {artists.map((section, index) => (
        <ArtistsSection key={categories[index]} section={categories[index]} artists={section} open={setOpened} opened={opened} scrollView={ref}/>
      ))}
    </SectionsContainer>
  );
}

export default SongBook;