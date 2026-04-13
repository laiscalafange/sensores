import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useBussola from '../hooks/useMagnet';
import usePedometer from '../hooks/usePedometer';


export default function App() {
  const { graus, direcao } = useBussola();
  const { ultPassosCont, passosAovivo } = usePedometer();

  return (
    <View>
      <Text>Bússola</Text>
      <Text>Graus: {graus}°</Text>
      <Text>Direção: {direcao}</Text>

      <Text>Pedômetro</Text>
      <Text>Passos (24h): {ultPassosCont}</Text>
      <Text>Passos em tempo real: {passosAovivo}</Text>
    </View>
  );
}