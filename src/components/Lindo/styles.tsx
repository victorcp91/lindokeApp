import styled from 'styled-components/native';
import { color } from '../../libs/variables';

export const Container = styled.View`
  width: 62px;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-bottom: 15px;
  position: relative;
`;

export const Name = styled.Text`
  color: ${color.yellow};
  font-weight: bold;
  font-size: 12px;
  position: absolute;
  bottom: -6px;
`;

export const SongContainer = styled.View`
  height: 50px;
  max-height: 50px;
  margin-left: -10px;
  margin-right: 10px;
  justify-content: center;
`;
