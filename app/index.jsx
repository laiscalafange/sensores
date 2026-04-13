import React from 'react';
import { View, Text } from 'react-native';
import useBussola from '../hooks/useMagnet';

export default function App() {
  const { graus, direcao } = useBussola();

  return (
    <View>
      <Text>Bússola</Text>
      <Text>Graus: {graus}°</Text>
      <Text>Direção: {direcao}</Text>
    </View>
  );
}