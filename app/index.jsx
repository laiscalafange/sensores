import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import useBussola from '../hooks/useMagnet';
import usePedometer from '../hooks/usePedometer';

export default function App() {
  const { graus, direcao } = useBussola();
  const { steps } = usePedometer();

  return (
    <View >
      <Text>Bússola</Text>
      <Text>Graus: {graus}°</Text>
      <Text>Direção: {direcao}{"\n"}</Text>

      <Text>Pedômetro</Text>
      <Text>Passos: {steps}</Text>
    </View>
  );
}

