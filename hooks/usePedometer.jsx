import { useState, useEffect, useRef } from 'react';
import { Pedometer } from 'expo-sensors';

// Esse código cria um "hook" que lê os passos do celular // O celular tem um sensor físico (acelerômetro) que detecta movimento // O Pedometer usa esse sensor pra contar passos automaticamente 
// 🟡 useRef:
// É uma "caixinha" que guarda um valor que NÃO reinicia quando a tela atualiza.
// Diferente do useState, ele NÃO faz a tela atualizar.
// Usamos aqui para guardar um histórico de valores.

export default function usePedometer() {
  // 🟢 Guarda o número de passos "cru" 
  // // Esse valor vem direto do sensor (pode ter erros/variações) 

  const [passos, setPassos] = useState(0);
  // 🟢 Guarda os passos depois de "tratados" 
  // // Aqui a gente tenta deixar o valor mais estável (menos erro) 

  const [passosFiltrados, setPassosFiltrados] = useState(0);
  // 🟡 useRef = uma "caixa" que guarda valores sem resetar 
  // // Aqui usamos pra guardar os últimos valores recebidos 

  const historico = useRef([]);
  // 🟡 Quantos valores vamos usar pra fazer a média 
  // // Ex: 5 últimos valores const tamanhoFiltro = 5; 

  const tamanhoFiltro = 5;

  // 🟡 useEffect:
  // É um lugar para executar algo automaticamente quando o componente inicia.
  // Aqui usamos para começar a ler o sensor quando a tela abre.
  // O [] significa: executa só UMA VEZ (quando inicia)

  useEffect(() => {
    // 🔍 Primeiro: o celular pode ou não ter pedômetro 
    // // Então a gente pergunta: 

    // 🟡 isAvailableAsync:
    // Verifica se o celular tem pedômetro.
    // "Async" = demora um pouquinho e retorna depois (não é instantâneo)
    // O .then pega o resultado quando estiver pronto
    Pedometer.isAvailableAsync().then((isAvailable) => {
      // 👣 Aqui começa o mais importante: 
      // // O app começa a "escutar" os passos em TEMPO REAL 

      if (isAvailable) {

        const subscription = Pedometer.watchStepCount((result) => {
         // 📥 O sensor manda um valor 
        // // Ex: 100 passos, depois 102, depois 101... 

          const novoPasso = result.steps;
          // 🟢 Guarda o valor direto (sem filtro) 

          setPassos(novoPasso);
           // 🟡 Agora começa o TRATAMENTO dos dados 
        // // Adiciona o valor novo no histórico 
          // 🟡 .current:
          // Tudo que está dentro do useRef fica em ".current"
          // É assim que acessamos o valor guardado
          historico.current.push(novoPasso);
           // Se tiver mais que 5 valores, remove o mais antigo 
        // // Isso mantém só os últimos dados 

          if (historico.current.length > tamanhoFiltro) {
            historico.current.shift();
          }
           // 📊 Aqui fazemos a MÉDIA dos valores 
        // // Isso serve pra tirar "ruído" (erros do sensor) 

          // 🟡 Essa "conta estranha" (média):
          // Vamos simplificar:
          // 1. Soma todos os valores do array
          // 2. Divide pela quantidade de valores

          // Exemplo:
          // [100, 102, 101]
          // soma = 303
          // quantidade = 3
          // média = 303 / 3 = 101

          const soma = historico.current.reduce((a, b) => a + b, 0);
          const media = soma / historico.current.length;
          // 🟢 Guarda o valor filtrado (mais confiável) 

          // 🟡 Math.round:
          // Arredonda o número
          // Ex:
          // 101.2 → 101
          // 101.7 → 102
          setPassosFiltrados(Math.round(media));
        });
         // 🧹 Quando sair da tela, para de escutar o sensor 
        // // Isso evita gastar bateria à toa 

        return () => subscription.remove();
        // ⚠️ Caso o celular não tenha pedômetro

      } else {
        console.warn('Pedômetro não disponível');
      }
    });

  }, []);
// 🚀 Executa só uma vez quando o app inicia 
          // // 📤 Retorna os dois valores
  return { passos, passosFiltrados };
}
