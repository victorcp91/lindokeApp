/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
 import 'react-native-gesture-handler';
 import React, { useState,useEffect, useRef } from 'react';
 import { View, Image,} from 'react-native';
 import { NavigationContainer, NavigationContainerRef, CommonActions} from '@react-navigation/native';
 import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
 import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
 import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
 import chroma from 'chroma-js';

 import { color } from './src/libs/variables';
 import LoginScreen from './src/screens/Login';
 import RoomsScreen from './src/screens/Rooms';
 import CreateRoomScreen from './src/screens/CreateRoom';
 import RoomStack from './src/screens/Room';

import ExitRoom from './src/components/ExitRoom';
import Lindo from './src/components/Lindo';

import { setUser } from './src/store/actions/user';
import { setFavorites } from './src/store/actions/favorites';

 type RoomParamList = {
   Login: undefined;
   Salas: undefined;
   NovaSala: undefined;
   Sala: {
    id: string;
    name: string;
   }
   
 }


 const App = () => {
  const Stack = createStackNavigator<RoomParamList>();
  const navigationRef = useRef<NavigationContainerRef>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: RootStateOrAny) => state.user);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(userData: any) {
    setInitializing(false);
    if(userData && userData._user){
      dispatch(setUser(userData._user));
      if(navigationRef.current){
        navigationRef.current.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Salas' }]
          })
        );
      }
    }else {
      auth().signOut();
    }
  }

  useEffect(() => {
    if(user){
      const listener = database().ref(`/userFavorites/${user.uid}`).on('value', snapshot => {
        const favorites = snapshot.val();
        if(favorites){
          dispatch(setFavorites(favorites));
        }
      });
      return () => database().ref(`/userFavorites/${user.uid}`).off('value',listener);
    }
  }, [user]);


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

   return (
     <NavigationContainer ref={navigationRef}>
       <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: chroma(color.blue).darken(0.3).hex()},
          headerTintColor: color.yellow,
          headerTitleStyle: {fontWeight: 'bold', fontSize: 22, alignSelf: 'center'},
          headerRightContainerStyle:{
            minWidth: 50
          },
          headerRight: () => (
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}>
              {user && (
                <>
                  <Image source={{uri: user?.photoURL}} width={25} height={25} style={{borderRadius: 25, backgroundColor: color.yellow}}/>
                </>
              )}
            </View>
          ),
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }
       }>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerLeft: () => <View/>}} name="Salas" component={RoomsScreen} />
        <Stack.Screen name="NovaSala" options={{title: 'Nova Sala'}} component={CreateRoomScreen} />
        <Stack.Screen options={({ route }) => ({ 
          title: route.params?.name,
          headerLeft: () => <ExitRoom />,
          headerRight: () => <Lindo />
        })
        } name="Sala" component={RoomStack}/>
      </Stack.Navigator>
     </NavigationContainer>
   );
 };

 export default App;
