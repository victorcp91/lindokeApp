
import styled from 'styled-components/native';
import { color } from '../../libs/variables';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: ${color.blue};
  padding: 0 10px;
`;

export const Info = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Name = styled.Text`
  color: ${color.yellow};
  font-size: 24px;
`;

export const SignDate = styled.Text`
  color: ${color.yellow};
  font-size: 16px;
`;

export const Logout = styled.TouchableOpacity`
  background-color: ${color.yellow};
  padding: 10px 20px;
  width: 100%;
  justify-content: center;
  align-items: center;

`;
export const LogoutText = styled.Text`
  color: ${color.blue};
  font-size: 20px;
  font-weight: bold;
`;