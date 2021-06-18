import styled from 'styled-components/native';
import { color } from '../../libs/variables';
import chroma from 'chroma-js';

interface buttonProps {
  opened: boolean;
}

export const ArtistButton = styled.TouchableOpacity<buttonProps>`
  padding: 10px 20px;
  background-color: ${props => props.opened ? chroma(color.blue).brighten(1.5).hex(): color.lightGray};
  border-bottom-width: 1px;
  border-color: ${color.yellow};
`;

export const ArtistName = styled.Text`
  color: ${color.yellow};
  font-weight: bold;
  font-size: 18px;
`;

export const SongsList= styled.View`
  flex-direction: column;
  background-color: ${chroma(color.lightGray).brighten(1).hex()};
  margin-bottom: 10px;
`;