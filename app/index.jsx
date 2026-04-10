import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer, Magnetometer } from 'expo-sensors';

export default function App() {
  //  Estados do pedômetro
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [pastStepCount, setPastStepCount] = useState(0);

  //  Estados do magnetômetro
  const [magData, setMagData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let pedometerSubscription;
    let magnetometerSubscription;

    const loadSensors = async () => {
      try {
        // Verificar pedômetro
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(isAvailable);

        if (isAvailable) {
          // Passos em tempo real
          pedometerSubscription = Pedometer.watchStepCount(result => {
            setStepCount(result.steps);
          });

          // Passos das últimas 24h
          Pedometer.watchStepCount(result => {
  setStepCount(result.steps);
});
        }

        // Magnetômetro (bússola)
        magnetometerSubscription = Magnetometer.addListener(data => {
          setMagData(data);
        });

        Magnetometer.setUpdateInterval(1000); // atualiza a cada 1s
      } catch (error) {
        console.log("Erro ao carregar sensores:", error);
      }
    };

    loadSensors();

    //  Limpar sensores ao sair
    return () => {
      pedometerSubscription && pedometerSubscription.remove();
      magnetometerSubscription && magnetometerSubscription.remove();
    };
  }, []);

  //  Cálculo da direção (bússola)
  const getDirection = () => {
    let angle = Math.atan2(magData.y, magData.x) * (180 / Math.PI);
    if (angle < 0) angle = angle + 360;

    if (angle >= 315 || angle < 45) return "Norte";
    if (angle >= 45 && angle < 135) return "Leste";
    if (angle >= 135 && angle < 225) return "Sul";
    if (angle >= 225 && angle < 315) return "Oeste";
  };

  return (
    <View style={styles.container}>
      {/* PEDÔMETRO */}
      <Text style={styles.title}> Pedômetro</Text>
      <Text>Disponível: {isPedometerAvailable ? "Sim" : "Não"}</Text>
      <Text>Passos em tempo real: {stepCount}</Text>
      <Text>Passos últimas 24h: {pastStepCount}</Text>

      {/* BÚSSOLA */}
      <Text style={styles.title}> Bússola</Text>
      <Text>X: {magData.x.toFixed(2)}</Text>
      <Text>Y: {magData.y.toFixed(2)}</Text>
      <Text>Z: {magData.z.toFixed(2)}</Text>
      <Text>Direção: {getDirection()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});