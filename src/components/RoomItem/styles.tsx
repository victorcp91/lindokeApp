import styled from 'styled-components/native';
import { color } from '../../libs/variables';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 20px 25px 20px 5px;
  margin: 0 10px;
  border-bottom-width: 2px;
  border-color: ${color.blue};
  align-items: center;
`;

export const Title = styled.Text`
  color: ${color.yellow};
  font-weight: bold;
  font-size: 16px;
`;

