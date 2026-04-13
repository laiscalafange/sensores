import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';

// Hook personalizado para lidar com o pedômetro
export default function usePedometer() {

  // Estado que verifica se o pedômetro está disponível no dispositivo
  const [pedometroDisponivel, setPedometroDisponivel] = useState('checando');

  // Estado que armazena os passos das últimas 24h
  const [ultPassosCont, setUltPassosCont] = useState(0);

  // Estado que armazena os passos em tempo real
  const [passosAovivo, setPassosAovivo] = useState(0);

  useEffect(() => {

    // Variável para guardar a inscrição do sensor (para depois remover) mostra se a conexão está disponivel sempre
    let subscription = null;

    // Função assíncrona para configurar o pedômetro
    const subscribe = async () => {

      // Verifica se o pedômetro está disponível no dispositivo
      const disponivel = await Pedometer.isAvailableAsync();

      // Atualiza o estado com o resultado (true ou false convertido para string)
      setPedometroDisponivel(String(disponivel));

      // Se não estiver disponível, para a execução
      if (!disponivel) return;

      // Data atual
      const end = new Date();

      // Data de 24h atrás
      const start = new Date();
      start.setDate(end.getDate() - 1);

      // Busca a quantidade de passos entre start e end
      const result = await Pedometer.getStepCountAsync(start, end);

      // Se houver resultado, atualiza o estado com os passos
      if (result) {
        setUltPassosCont(result.steps);
      }

      // Inicia a contagem de passos em tempo real
      subscription = Pedometer.watchStepCount(result => {

        // Atualiza os passos em tempo real sempre que o usuário anda
        setPassosAovivo(result.steps);
      });
    };

    // Chama a função que configura o pedômetro
    subscribe();

    // Função de limpeza (executa quando o componente desmonta)
    return () => {

      // Remove a inscrição do sensor para evitar vazamento de memória
      if (subscription) {
        subscription.remove();
      }
    };

  }, []); // Executa apenas uma vez ao montar o componente

  // Retorna os dados para serem usados em outros componentes
  return { pedometroDisponivel, ultPassosCont, passosAovivo };
};
