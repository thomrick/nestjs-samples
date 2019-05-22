import { Server, Client, Packet, persistence } from 'mosca';

export async function bootstrap() {
  return new Promise<Server>((resolve) => {
    const settings = {
      port: 1883,
      id: 'test',
      logger: {
        level: 'info',
      },
      backend: {
        type: 'zmq',
        json: true,
        zmq: require('zmq'),
        port: 'tcp://127.0.0.1:33333',
        controlPort: 'tcp://127.0.0.1:33334',
        delay: 10,
      },
      persistance: {
        factory: persistence.Memory,
      },
    };
    const server = new Server(settings);
    server.on('clientConnected', (client: Client) => {
      console.log('client connected', client.id);
    });
    server.on('subscribed', (topic: any, client: Client) => {
      console.log('subscribed', topic, client.id);
    });
    server.on('published', (packet: Packet, client: Client) => {
      console.log('published', packet);
    });

    server.on('ready', () => {
      resolve(server);
    });
  });
}
