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


export const ErrorText = styled.Text`
  color: ${color.red};
  font-weight: bold;
  font-size: 18px;
`;
