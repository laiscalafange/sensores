import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';


export default function usePedometer() {
  const [passos, setPassos] = useState(0);  
  const [isAvailable, setIsAvailable] = useState(false); // Verifica se o celular tem esse sensor

    useEffect(() => {
    let subscription;

  

  }, []);

  // Entrega os dados pro app
  return {
    passos,
    isAvailable
  };
}