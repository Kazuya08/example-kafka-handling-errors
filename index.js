const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

client.on('ready', () => {
    console.log('kafka conectado com sucesso')
});

const MAX_RETRIES = 3;
let retryCount = 0;

client.on('error', (error) => {
     console.error('Erro na conexão com o Kafka:', error);
  
  if (retryCount < MAX_RETRIES) {
    retryCount++;
    console.log(`Tentativa de reconexão número ${retryCount}`);
    setTimeout(() => {
      client.connect();
    }, 100);
  } else {
    console.error(`Falha na conexão com o Kafka após ${MAX_RETRIES} tentativas. Encerrando...`);
    process.exit(1); //encerra o processo q esta sendo feito
  }
});


// exemplo de falha de autenticação
// client.on('error', (error) => {
//   if (error.name === 'BrokerAuthenticationFailureError') {
//     console.error('Erro de autenticação com o Kafka:', error);
//     // Lógica para lidar com erros de autenticação
//     // ...
//   } else {
//     console.error('Erro na conexão com o Kafka:', error);
//     // Lógica para lidar com outros erros de conexão
//     // ...
//   }
// });
