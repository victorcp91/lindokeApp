import styled from 'styled-components/native';
import { color } from '../../libs/variables';

export const Container = styled.View`
  flex-direction: row;
  padding: 20px 25px;
  border-bottom-width: 1px;
  border-color: ${color.blue};
  align-items: center;
`;

export const Song = styled.TouchableOpacity`
  flex: 1;
  margin-right: 20px;
`;

export const Title = styled.Text`
  color: ${color.blue};
  font-weight: bold;
  font-size: 14px;
`;

export const Favorite  = styled.TouchableOpacity`
  margin-left: 20px;
`;
