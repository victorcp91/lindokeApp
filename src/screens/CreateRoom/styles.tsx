import styled from 'styled-components/native';
import { color } from '../../libs/variables';
import chroma from 'chroma-js';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${color.lightGray};
  padding: 0 20px;
`;

export const Name = styled.TextInput.attrs(props => ({
  placeholderTextColor: chroma(color.yellow).alpha(.7).hex(),
}))`
  border-color: ${color.yellow};
  border-bottom-width: 2px;
  margin: 0 20px;
  width: 100%;
  margin-bottom: 50px;
  font-weight: bold;
  font-size: 18px;
  color: ${color.yellow}
`;

export const Create = styled.TouchableOpacity`
  background-color: ${color.yellow};
  padding: 10px 25px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;

`;

export const CreateText = styled.Text`
  color: ${color.blue};
  font-weight: bold;
  font-size: 18px;
`;
