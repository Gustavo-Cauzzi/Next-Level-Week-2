import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import api from '../../services/api';

function TeacherList(){
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]); //Array numérico (id's)

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function handleFiltersSubmit(){
    loadFavorites();
    const response = await api.get('/classes',{
      params: {
        subject,
        week_day,
        time
      }
    });
    setTeachers(response.data);
    setIsFiltersVisible(false);
  }

  function handleToggleFiltersVisible(){
    setIsFiltersVisible(!isFiltersVisible);
  }

  function loadFavorites(){
    AsyncStorage.getItem('favorites').then(res => {
      if(res){
        const favoritedTeachers = JSON.parse(res);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) =>{
          return teacher.id;
        });
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  return (
    <View style={styles.container}> 
      <PageHeader 
        title="Proffys Disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF"/>
          </BorderlessButton>
        }      
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={text => {setSubject(text)}}
              style={styles.input}
              placeholder="Qual a matéria?"
              />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => {setWeekDay(text)}}
                  placeholder="Qual o dia?"
                />  
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual horário?"
                  value={time}
                  onChangeText={text => {setTime(text)}}
                />  
              </View>
            </View>
            <RectButton 
              style={styles.submitButton} 
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ //Comentário 1 Final da página
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}
      </ScrollView>

    </View>
  );
}

export default TeacherList;

/*

  1 - contentContainerStyle é coisa do react que adiciona
  algumas propriedades legais tipo esse paddings específicos


  2 - useEffect() = carregar algo assim que o componente é 
  chamado.
  Sintaxe: useEffect( () = {} [] )
  {} = Função a ser executada
  [] = toda vez que variavel "" mudar, execute denovo
*/