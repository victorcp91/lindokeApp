import styled from 'styled-components/native';
import { color } from '../../libs/variables';
import chroma from 'chroma-js';

export const SongsList= styled.View`
  flex-direction: column;
  background-color: ${chroma(color.lightGray).brighten(1).hex()};
  margin-bottom: 10px;
`;