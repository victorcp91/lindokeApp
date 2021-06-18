import React from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '386449869236-9oui6a7vi72bqrf5inh7fml6h5cssds7.apps.googleusercontent.com',
});

import buttonBackground from '../../assets/socialBackground.png'
import buttonBackground2 from '../../assets/socialBackground2.png'
import buttonBackground3 from '../../assets/socialBackground3.png'

import Lindoke from '../../assets/lindoke.svg';

import pattern from '../../assets/pattern.png';

import { Container, Content, PatternBackground, EnterMessage, Options, SocialButton, ButtonBackground, ButtonText } from './styles';

const Login: React.FC = () => {

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log(data);
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }


  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }


  return (
    <Container>
      <Content>
        <PatternBackground source={pattern}/>
        <Lindoke width={'70%'} />
        <EnterMessage>Entrar usando</EnterMessage>
        <Options>
          <SocialButton onPress={onFacebookButtonPress}>
            <ButtonBackground source={buttonBackground}/>
            <ButtonText>Facebook</ButtonText>
          </SocialButton>
          <SocialButton onPress={onGoogleButtonPress}>
            <ButtonBackground source={buttonBackground2}/>
            <ButtonText>Conta Google</ButtonText>
          </SocialButton>
          {/* <SocialButton>
            <ButtonBackground source={buttonBackground3}/>
            <ButtonText>Email</ButtonText>
          </SocialButton> */}
        </Options>
      </Content>
    </Container>
  );
}

export default Login;