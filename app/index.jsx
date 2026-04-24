import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useBussola from '../hooks/useMagnet';
import usePedometer from '../hooks/usePedometer';

export default function App() {
  const { graus, direcao } = useBussola();
  const { passos } = usePedometer();


  return (
    <View style={styles.container}>
  <Text style={styles.titulo}>Bússola</Text>
  <Text style={styles.texto}>Graus: {graus}°</Text>
  <Text style={styles.texto}>Direção: {direcao}</Text>
  <Text style={styles.titulo}>Conta passos</Text>
  <Text style={styles.texto}>Passos: {passos}</Text>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#3a3939', 
    padding: 20,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff', 
    borderRadius:2,
    marginBottom: 10,
    textAlign: 'center',
  },

  texto: {
    fontSize: 20,
    color: '#15ff00',
    backgroundColor: '#047400', 
    textAlign: 'center',
    marginBottom: 5,
  }
});