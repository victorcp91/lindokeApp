import React, { useState, useEffect } from 'react';
import {Text, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute, RouteProp } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import QRCodeScanner from 'react-native-qrcode-scanner';
import queryString from 'query-string';
import { BarCodeReadEvent } from 'react-native-camera';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';

import PlaylistScreen from '../Playlist';
import SongBookScreen from '../SongBook';
import FavoritesScreen from '../Favorites';
import GradeScreen from '../Grade';
import ChooseLindo from '../../components/ChooseLindo';

import Playlist from '../../assets/playlist.svg';
import SongbookIcon from '../../assets/songbook.svg';
import FavoriteIcon from '../../assets/star_stroke.svg';
import TrophyIcon from '../../assets/trophy.svg';

import { setRoom } from '../../store/actions/room';

import {color as defaultColors} from '../../libs/variables';
import { valid } from 'chroma-js';

type RouteParams = {
  A: undefined;
  B: {
    id: string;
    title: string;
  }
}


type UserType = {
  uid: string;
  avatar: string|number;
}

type LindoType = {
  lindoName: string;
  lindoIndex: number;
};


const Room: React.FC = () => {

  const dispatch = useDispatch();

  const {user, room} = useSelector((state: RootStateOrAny) => state);
  
  const Tab = createBottomTabNavigator();

  const route = useRoute<RouteProp<RouteParams, 'B'>>();

  const [loading, setLoading] = useState<boolean>(true);
  const [QRReader, setQRReader] = useState<boolean>(false);
  const [choosenLindo, setChoosenLindo] = useState<LindoType|null>(null);

  useEffect(() => {
    if(route.params){
      const listener = database()
      .ref(`/rooms/${route.params.id}`)
      .on('value', snapshot => {
        const data = snapshot.val();
        dispatch(setRoom({id: route.params.id, ...data}));
        if(data?.screenActive){
          setLoading(false);
          setQRReader(false);
        } else {
          setLoading(false);
          setQRReader(true);
        }
      });
  
      return () => database().ref(`/rooms/${route.params.id}`).off('value',listener);
    }
  }, [route.params]);

  useEffect(() => {
    let roomRef = database().ref(`/rooms/${route.params.id}`);
    const updatedRoom = roomRef.once('value').then(snapshot => {
      if(!snapshot.val().onlineUsers ||
      !snapshot.val().onlineUsers.find((u: UserType) => u.uid === user.uid) ){
        roomRef.update({
          onlineUsers: snapshot.val().onlineUsers ?
            [...room.onlineUsers, {
              uid: user.uid
            }]: [
              {
                uid: user.uid,
              }
            ]
        });
      }
    });
   
    roomRef.onDisconnect().update({
      onlineUsers: room.onlineUsers ? room.onlineUsers.filter((u: UserType) => u.uid !== user.uid) : []
    });
    
    return () => {
      if(room.onlineUsers && room.onlineUsers.length > 1){
        roomRef.update({
          onlineUsers: room.onlineUsers.filter((u: UserType) => u.uid !== user.uid)
        });
      } else {
        if(room.screenActive){
          let screenRef = database().ref(`/screens/${room.screenActive}`);
          screenRef.update({
            room: ''
          });
        }
        roomRef.update({
          onlineUsers: null,
          screenActive: ''
        });
      }
    };
  }, []);

  useEffect(() => {
    if(choosenLindo){
      let roomRef = database().ref(`/rooms/${route.params.id}/`);
      roomRef.update({
        onlineUsers: [
          ...room.onlineUsers.filter((u: UserType) => u.uid !== user.uid),
          {
            uid: user.uid,
            ...choosenLindo
          }
        ]
      });
    }
  }, [choosenLindo]);

  function onQRCODEsuccess(qrCode: BarCodeReadEvent){
    const urlParams  = queryString.parseUrl(qrCode.data);
    if(urlParams?.query?.link){
      const link = urlParams.query.link;
      if(typeof link === 'string'){
      const screen = link.split('screen')[1];
        database().ref(`/screens/${screen}`).update({
          room: route.params.id
        }).then(() => {
          database().ref(`/rooms/${route.params.id}`).update({
            screenActive: screen
          });
        });
      }
    }
  }

  useEffect(() => {
    if(!loading && !QRReader){

    }
  }, [loading, QRReader]);
  
  if(loading) {
    return <Text>Carregando</Text>;
  }

  if(QRReader){
    return(
      <QRCodeScanner
        onRead={onQRCODEsuccess}
        topContent={
          <Text >
            Go to{' '}
            <Text >wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity >
            <Text>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    )
  }
  if(!choosenLindo){
    return <ChooseLindo chooseLindo={setChoosenLindo}/>;
  }

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: defaultColors.yellow,
          inactiveTintColor: defaultColors.blue
          
        }}
      >
        <Tab.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{
            tabBarIcon: ({color}) => <Playlist width={25} height={25} fill={color} stroke={color}/>
          }}
        />
        <Tab.Screen
          name="Músicas"
          component={SongBookScreen}
          options={{
            tabBarIcon: ({color}) => <SongbookIcon width={25} height={25} fill={color} stroke={color}/>
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({color}) => <FavoriteIcon width={25} height={25} fill={color} stroke={color}/>
          }}
        />
        <Tab.Screen
          name="Nota"
          component={GradeScreen}
          options={{
            tabBarIcon: ({color}) => <TrophyIcon width={25} height={25} fill={color} stroke={color}/>
          }}
        />
      </Tab.Navigator>
    </>
   );
}

export default Room;