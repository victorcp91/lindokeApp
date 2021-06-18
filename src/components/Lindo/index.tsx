import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { useSelector, RootStateOrAny } from 'react-redux';
import { View } from 'react-native';

import Monster1 from '../../assets/lindos/001-monster.svg';
import Monster2 from '../../assets/lindos/002-monster.svg';
import Monster3 from '../../assets/lindos/003-monster.svg';
import Monster4 from '../../assets/lindos/004-monster.svg';
import Monster5 from '../../assets/lindos/005-monster.svg';
import Monster6 from '../../assets/lindos/006-monster.svg';
import Monster7 from '../../assets/lindos/007-monster.svg';
import Monster8 from '../../assets/lindos/008-monster.svg';
import Monster9 from '../../assets/lindos/009-monster.svg';
import Monster10 from '../../assets/lindos/010-monster.svg';
import Monster11 from '../../assets/lindos/011-monster.svg';
import Monster12 from '../../assets/lindos/012-monster.svg';
import Monster13 from '../../assets/lindos/013-monster.svg';
import Monster14 from '../../assets/lindos/014-monster.svg';
import Monster15 from '../../assets/lindos/015-monster.svg';
import Monster16 from '../../assets/lindos/016-monster.svg';
import Monster17 from '../../assets/lindos/017-monster.svg';
import Monster18 from '../../assets/lindos/018-monster.svg';
import Monster19 from '../../assets/lindos/019-monster.svg';
import Monster20 from '../../assets/lindos/020-monster.svg';
import Monster21 from '../../assets/lindos/021-monster.svg';
import Monster22 from '../../assets/lindos/022-monster.svg';
import Monster23 from '../../assets/lindos/023-monster.svg';
import Monster24 from '../../assets/lindos/024-monster.svg';
import Monster25 from '../../assets/lindos/025-monster.svg';
import Monster26 from '../../assets/lindos/026-monster.svg';
import Monster27 from '../../assets/lindos/027-monster.svg';
import Monster28 from '../../assets/lindos/028-monster.svg';
import Monster29 from '../../assets/lindos/029-monster.svg';
import Monster30 from '../../assets/lindos/030-monster.svg';
import Monster31 from '../../assets/lindos/031-monster.svg';
import Monster32 from '../../assets/lindos/032-monster.svg';
import Monster33 from '../../assets/lindos/033-monster.svg';
import Monster34 from '../../assets/lindos/034-monster.svg';
import Monster35 from '../../assets/lindos/035-monster.svg';
import Monster36 from '../../assets/lindos/036-monster.svg';
import Monster37 from '../../assets/lindos/037-monster.svg';
import Monster38 from '../../assets/lindos/038-monster.svg';
import Monster39 from '../../assets/lindos/039-monster.svg';
import Monster40 from '../../assets/lindos/040-monster.svg';
import Monster41 from '../../assets/lindos/041-monster.svg';
import Monster42 from '../../assets/lindos/042-monster.svg';
import Monster43 from '../../assets/lindos/043-monster.svg';
import Monster44 from '../../assets/lindos/044-monster.svg';
import Monster45 from '../../assets/lindos/045-monster.svg';
import Monster46 from '../../assets/lindos/046-monster.svg';
import Monster47 from '../../assets/lindos/047-monster.svg';
import Monster48 from '../../assets/lindos/048-monster.svg';
import Monster49 from '../../assets/lindos/049-monster.svg';
import Monster50 from '../../assets/lindos/050-monster.svg';
import Monster51 from '../../assets/lindos/051-monster.svg';
import Monster52 from '../../assets/lindos/052-monster.svg';
import Monster53 from '../../assets/lindos/053-monster.svg';
import Monster54 from '../../assets/lindos/054-monster.svg';
import Monster55 from '../../assets/lindos/055-monster.svg';
import Monster56 from '../../assets/lindos/056-monster.svg';
import Monster57 from '../../assets/lindos/057-monster.svg';
import Monster58 from '../../assets/lindos/058-monster.svg';
import Monster59 from '../../assets/lindos/059-monster.svg';
import Monster60 from '../../assets/lindos/060-monster.svg';
import Monster61 from '../../assets/lindos/061-monster.svg';
import Monster62 from '../../assets/lindos/062-monster.svg';
import Monster63 from '../../assets/lindos/063-monster.svg';
import Monster64 from '../../assets/lindos/064-monster.svg';
import Monster65 from '../../assets/lindos/065-monster.svg';
import Monster66 from '../../assets/lindos/066-monster.svg';
import Monster67 from '../../assets/lindos/067-monster.svg';
import Monster68 from '../../assets/lindos/068-monster.svg';
import Monster69 from '../../assets/lindos/069-monster.svg';
import Monster70 from '../../assets/lindos/070-monster.svg';
import Monster71 from '../../assets/lindos/071-monster.svg';
import Monster72 from '../../assets/lindos/072-monster.svg';
import Monster73 from '../../assets/lindos/073-monster.svg';
import Monster74 from '../../assets/lindos/074-monster.svg';
import Monster75 from '../../assets/lindos/075-monster.svg';
import Monster76 from '../../assets/lindos/076-monster.svg';
import Monster77 from '../../assets/lindos/077-monster.svg';
import Monster78 from '../../assets/lindos/078-monster.svg';
import Monster79 from '../../assets/lindos/079-monster.svg';
import Monster80 from '../../assets/lindos/080-monster.svg';
import Monster81 from '../../assets/lindos/081-monster.svg';
import Monster82 from '../../assets/lindos/082-monster.svg';
import Monster83 from '../../assets/lindos/083-monster.svg';
import Monster84 from '../../assets/lindos/084-monster.svg';
import Monster85 from '../../assets/lindos/085-monster.svg';
import Monster86 from '../../assets/lindos/086-monster.svg';
import Monster87 from '../../assets/lindos/087-monster.svg';
import Monster88 from '../../assets/lindos/088-monster.svg';
import Monster89 from '../../assets/lindos/089-monster.svg';
import Monster90 from '../../assets/lindos/090-monster.svg';
import Monster91 from '../../assets/lindos/091-monster.svg';
import Monster92 from '../../assets/lindos/092-monster.svg';
import Monster93 from '../../assets/lindos/093-monster.svg';
import Monster94 from '../../assets/lindos/094-monster.svg';
import Monster95 from '../../assets/lindos/095-monster.svg';
import Monster96 from '../../assets/lindos/096-monster.svg';
import Monster97 from '../../assets/lindos/097-monster.svg';
import Monster98 from '../../assets/lindos/098-monster.svg';
import Monster99 from '../../assets/lindos/099-monster.svg';
import Monster100 from '../../assets/lindos/100-monster.svg';

const Monsters = [Monster1,Monster2,Monster3,Monster4,Monster5,Monster6,Monster7,Monster8,Monster9,Monster10,Monster11,Monster12,Monster13,Monster14,Monster15,Monster16,Monster17,Monster18,Monster19,Monster20,Monster21,Monster22,Monster23,Monster24,Monster25,Monster26,Monster27,Monster28,Monster29,Monster30,Monster31,Monster32,Monster33,Monster34,Monster35,Monster36,Monster37,Monster38,Monster39,Monster40,Monster41,Monster42,Monster43,Monster44,Monster45,Monster46,Monster47,Monster48,Monster49,Monster50,Monster51,Monster52,Monster53,Monster54,Monster55,Monster56,Monster57,Monster58,Monster59,Monster60,Monster61,Monster62,Monster63,Monster64,Monster65,Monster66,Monster67,Monster68,Monster69,Monster70,Monster71,Monster72,Monster73,Monster74,Monster75,Monster76,Monster77,Monster78,Monster79,Monster80,Monster81,Monster82,Monster83,Monster84,Monster85,Monster86,Monster87,Monster88,Monster89,Monster90,Monster91,Monster92,Monster93,Monster94,Monster95,Monster96,Monster97,Monster98,Monster99,Monster100];

import { Container, Name } from './styles';

type onlineUserType = {
  uid: string;
  lindoName: string;
  lindoIndex: string;
};

type propTypes = {
  index?: number;
}

const Lindo: React.FC<propTypes> = ({index}) => {

  const {user, room} = useSelector((state: RootStateOrAny) => state);

  const currentUser = useMemo(() => {
    if(room.onlineUsers){
      return room.onlineUsers.find((u:onlineUserType) => u.uid === user.uid);
    } return false;
  }, [user, room]);

  const CurrentLindo = useMemo(() => {
    if(index){
      return Monsters[index];
    }
    if(currentUser){
      return Monsters[currentUser.lindoIndex];
    } return false;
  }, [currentUser]);

  if(currentUser && CurrentLindo){
    return <Container>
      <CurrentLindo width={30}/>
      {!index && <Name>{currentUser.lindoName}</Name>}
    </Container>;
  } return <></>;
 
}

export default Lindo;