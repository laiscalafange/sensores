import { useEffect, useState, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';

export default function usePedometer() {

  //"passos" é a caixinha que guarda o número de passos na tela.
  // Sempre que ela muda, a tela atualiza sozinha.
  const [passos, setPassos] = useState(0);

  // "ultValor" é um bloco de rascunho — guarda a última intensidade de movimento lida. Não atualiza a tela quando muda.
  const ultValor = useRef(0);

  //outro rascunho: guarda o horário exato do último passo detectado.
  // Serve para evitar contar dois passos muito rápidos (tremor, por ex.)
  const ultoPassoTime = useRef(0);

  useEffect(() => {
    //Diz ao celular: "me manda dados do acelerômetro a cada 100ms"
    //(ou seja, 10 vezes por segundo)
    Accelerometer.setUpdateInterval(100);

    // Fica "ouvindo" o acelerômetro continuamente.
    // Cada vez que chega um dado novo, essa função roda.
    const subscription = Accelerometer.addListener(data => {

      // x, y, z são as forças nos 3 eixos do espaço (esquerda/direita,
      // frente/trás, cima/baixo). O celular mede tudo isso ao mesmo tempo.
      const { x, y, z } = data;

      //Aqui juntamos os 3 eixos num único número: a "intensidade total"
      // do movimento. É a fórmula de distância em 3D (Pitágoras estendido).
      // Parado numa mesa: ≈ 1.0  |  Andando: oscila entre 0.5 e 2.0
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      //Compara a intensidade AGORA com a intensidade NA LEITURA ANTERIOR.
      // Se o número variou muito → houve um movimento brusco → possível passo.
      const diff = Math.abs(magnitude - ultValor.current);

      //Pega o horário atual em milissegundos
      const agora = Date.now();

      //Só conta como passo se AS DUAS condições forem verdadeiras:
      if (
        diff > 0.8 &&                        
        // 1) a variação foi grande o suficiente(0.8 é o limiar — ajuste se quiser mais ou menos sensibilidade)
        agora - ultoPassoTime.current > 400     
        // 2) já passaram 400ms desde o último passo (evita contar tremores)
      ) {
        setPassos(prev => prev + 1);          
        //conta +1 passo!
        ultoPassoTime.current = agora;          
        //registra o horário deste passo
      }

      //Salva a intensidade atual para comparar na próxima leitura
      ultValor.current = magnitude;
    });

    //Quando o componente sair da tela, para de ouvir o acelerômetro(economiza bateria e evita erros)
    return () => subscription.remove();

  }, []); // ← o [] significa "roda isso só uma vez, quando a tela abrir"

  //Devolve os passos para quem usar esse hook poder exibir na tela
  return { passos };
}