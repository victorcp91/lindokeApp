import React from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import UserIcon from '../../assets/user.svg';
import { color } from '../../libs/variables';

import { logout } from '../../store/actions/user';
import { clearFavorites } from '../../store/actions/favorites';
import { clearRooms } from '../../store/actions/rooms';

import { Container, Content, Info, Name, SignDate, Logout, LogoutText } from './styles';

const ProfileScreen = () => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  function logoutUser(){
    auth().signOut().then(() => {
      navigation.navigate('Login');
      dispatch(clearFavorites());
      dispatch(clearRooms());
      dispatch(logout());
    });
  }

  return (<Container>
    <Content>
      <Info>
        <UserIcon  width={50} height={50} fill={color.yellow} stroke={color.yellow}/>
        <Name>{user?.displayName}</Name>
        <SignDate>Entrou em {`${new Date(user?.metadata?.creationTime).getDate()}/${new Date(user?.metadata?.creationTime).getMonth()}/${new Date(user?.metadata?.creationTime).getFullYear()}`}</SignDate>
      </Info>
      <Logout onPress={logoutUser}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Content>
  </Container>);
}

export default ProfileScreen;