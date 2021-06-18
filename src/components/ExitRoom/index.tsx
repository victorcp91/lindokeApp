import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { StackActions, useNavigation } from '@react-navigation/native';


import Exit from '../../assets/exit.svg';

import { color } from '../../libs/variables';

import { Container, ExitButton, ExitText } from './styles';

const ExitRoom: React.FC = () => {
  const [exitMessage, setExitMessage] = useState<boolean>(false);

  const navigation = useNavigation();
  
  function exit(){
    navigation.dispatch(StackActions.pop(1));
  }

  function tryExit(){
   setExitMessage(true);
  }

  return <Container>
    <ExitButton onPress={tryExit}>
      <Exit width={20} height={20} fill={color.yellow} stroke={color.yellow}/>
      <ExitText>Sair</ExitText>
    </ExitButton>
    <AwesomeAlert
      show={exitMessage}
      title="Sair"
      message="Tem certeza que deseja sair da sala?"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Não"
      confirmText="Yes"
      confirmButtonColor={color.yellow}
      onCancelPressed={() => {
        setExitMessage(false);
      }}
      onConfirmPressed={exit}
      useNativeDriver={true}
      messageStyle={{color: color.blue}}
      titleStyle={{color: color.blue, fontWeight: 'bold'}}
      cancelButtonTextStyle={{fontWeight: 'bold', fontSize: 18}}
      cancelButtonStyle={{marginRight: 20}}
      confirmButtonTextStyle={{fontWeight: 'bold', fontSize: 18}}
    />
  </Container>
}

export default ExitRoom;