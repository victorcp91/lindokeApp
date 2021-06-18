import styled from 'styled-components/native';
import { color } from '../../libs/variables';


export const Container = styled.View`
`;

export const ExitButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const ExitText = styled.Text`
  color: ${color.yellow};
  font-size: 12px;
`;