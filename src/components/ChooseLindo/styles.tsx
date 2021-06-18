import styled from 'styled-components/native';
import { color } from '../../libs/variables';
import chroma from 'chroma-js';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${chroma(color.blue).brighten(.5).hex()};
  z-index: 5;
`;

export const MonsterContainer = styled.View`
  height: 50px;
  width: 90%;
  justify-content: center;
  align-items: center;
  margin-bottom: 50%;
`;

export const NameTextInput = styled.TextInput`
  width: 90%;
  height: 50px;
  background-color: ${color.lightGray};
  padding: 5px;
  text-align: center;
  margin-bottom: 50px;
  font-size: 20px;
  font-weight: bold;
`;

export const Start = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  background-color: ${props => props.disabled ? color.lightGray: color.yellow};
  opacity: ${props => props.disabled ? 0.5 : 1};
  justify-content: center;
  align-items: center;
`;

export const StartText = styled.Text`
  color: ${color.blue};
  font-weight: bold;
  font-size: 24px;
`;