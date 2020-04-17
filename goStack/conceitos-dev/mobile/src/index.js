import React, {useEffect, useState}from 'react';
import {View, FlatList, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    })
  }, []);

async function handleAddProject() {
  const response= await api.post('projects', {
    title: `Novo projeto ${Date.now()}`,
    owner: `Diego Fernandes`
  });

  const project = response.data;

  setProjects([...projects, project]);

  };
  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
     
      <SafeAreaView style={styles.container}>
      <FlatList 
        data={projects}
        keyExtractor={project => project.id}
        renderItem={({ item: project }) => (
        <Text style={styles.project}>{project.title}</Text>
        )}
      />

      <TouchableOpacity 
            activeOpacity={0.9} 
            style={styles.button} 
            onPress={handleAddProject}
            >
        <Text style={styles.buttonText}>Adicionar Projeto</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159C1',
  },
 
  project:{
    color: '#FFF',
    fontSize: 30,
  },
  button:{
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontWeight: 'bold',
    fontSize: 16
  }
});


      // {/* <View style={styles.container}>
      //   {projects.map(project => (
      //   <Text style={styles.project}key={project.id}>{project.title}</Text>
      // ))}
      // </View> */}