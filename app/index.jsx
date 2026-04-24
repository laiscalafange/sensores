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
  <Text style={styles.titulo}>Pedômetro</Text>
  <Text style={styles.texto}>Passos: {passos}</Text>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },

  texto: {
    fontSize: 16,
    marginTop: 5,
  }
});