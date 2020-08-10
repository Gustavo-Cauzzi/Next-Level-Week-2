import React, { useEffect, useState } from 'react';
import {View, Image, Text, TouchableOpacity, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';


function Landing(){
const {navigate} = useNavigation();

function handleNavigateToGiveClassesPage(){
  navigate('GiveClasses');
}

function handleNavigateToStudyPages(){
  navigate('Study');
}

const [totalConnections, setTotalConnections] = useState(0);
useEffect(() => {
  api.get('/connections').then(res => {
    const {total} = res.data;
    
    setTotalConnections(total);
  })
}, []);

  return(
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner}/>

      <Text style={styles.title}>
        Seja bem-vindo! {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton 
          style={[styles.button,styles.buttonPrimary]}
          onPress={handleNavigateToStudyPages}
          >
          <Image source={studyIcon}></Image>
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton 
          style={[
            styles.button,
            styles.buttonSecondary
          ]}
          onPress={handleNavigateToGiveClassesPage}
        >
          <Image source={giveClassesIcon}></Image>
          <Text style={styles.buttonText}>Dar aula</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;