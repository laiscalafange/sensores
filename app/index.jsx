import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import useBussola from '../hooks/useMagnet';
import usePedometer from '../hooks/usePedometer';

export default function App() {
  const { graus, direcao } = useBussola();
  const { passosFiltrados } = usePedometer();

  return (
    <View style={styles.container}>
      <Text>Bússola</Text>
      <Text>Graus: {graus}°</Text>
      <Text>Direção: {direcao}{"\n"}</Text>

      <Text>Pedômetro</Text>
      <Text>Passos: {passosFiltrados}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa a tela toda
    justifyContent: 'center', // centraliza verticalmente
    alignItems: 'center', // centraliza horizontalmente
  }
});