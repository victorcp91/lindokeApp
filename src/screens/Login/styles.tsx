
import styled from 'styled-components/native';
import { color } from '../../libs/variables';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${color.blue};
`;

export const PatternBackground = styled.ImageBackground`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: .2;
`;

export const EnterMessage = styled.Text`
  color: ${color.yellow};
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
`;

export const Options = styled.View`
  position: relative;
`;

export const SocialButton = styled.TouchableOpacity`
  color: ${color.yellow};
  font-size: 20px;
  padding: 10px 25px;
  margin-top: 30px;
  align-items: center;
`;

export const ButtonBackground = styled.ImageBackground`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ButtonText = styled.Text`
  color: ${color.blue};
  font-size: 25px;
  font-weight: bold;
`;