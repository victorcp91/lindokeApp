import styled from 'styled-components/native';
import { color } from '../../libs/variables';
import chroma from 'chroma-js';

interface songsType{
  title: string;
  id: string;
}

type artistType = {
  name: string;
  songs: songsType[];
};


export const SectionButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${color.lightGray};
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${color.blue};
  padding: 10px 0;
`;

export const SectionText = styled.Text`
  color: ${color.blue};
  font-weight: bold;
  font-size: 20px;
`;

export const ArtistsList= styled.View`
  flex-direction: column;
  background-color: ${color.lightGray};
  margin-bottom: 10px;
`;