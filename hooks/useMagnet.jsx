import { useEffect, useState } from 'react';
import { Magnetometer } from 'expo-sensors';

export default function useBussola() {

  const [graus, setGraus] = useState(0);

  // código que vai rodar quando app iniciar
  useEffect(() => {
    Magnetometer.setUpdateInterval(500); // define tempo de atualização do sensor (em ms), então é meio segundo(0,5s)

    const subscription = Magnetometer.addListener(({ x, y }) => {
        // calculo do angulo usando a função atan2, que retorna o ângulo em radianos entre o eixo x e o ponto (x, y) -> depois converte para graus multiplicando por (180 / Math.PI)
      let angulo = Math.atan2(y, x) * (180 / Math.PI); // -> tarnsforma os dados do sensor em um angulo de 0 a 360 graus

      if (angulo < 0) {
        angulo += 360; // corrigir valores negativos para que fiquem entre 0 e 360 graus
      }

      setGraus(Math.round(angulo)); // arredonda o valor do ângulo para o número inteiro mais próximo 
    });

    return () => subscription.remove(); // para o sensor quando sair da tela

  }, []);

  function getDirecao(graus) { // trasnforma graus em direção
    if (graus >= 315 || graus < 45) return "N";
    if (graus >= 45 && graus < 135) return "L";
    if (graus >= 135 && graus < 225) return "S";
    return "O";
  }

  return {
    graus,
    direcao: getDirecao(graus)
  }; // aqui está retornando os dados prontos para usar na interface
}