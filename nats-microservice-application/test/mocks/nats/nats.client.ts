import { EventEmitter } from 'events';
import { NatsMockServer } from './nats.server';

export class NatsMockClient extends EventEmitter {
  private readonly server: NatsMockServer;

  constructor(server: NatsMockServer) {
    super();
    this.server = server;
    this.connect();
  }

  private connect() {
    this.server.connect(this);
  }

  public close() {
    // nothing to implement.
  }

  public publish(queue: string | undefined, message: any) {
    console.log(`[${NatsMockClient.name}] - publish | queue : ${queue} | message : ${JSON.stringify(message)}`);
  }

  public request(topic: string, packet: any, handler: (message) => void) {
    console.log(`[${NatsMockClient.name}] - request | topic : ${topic} | packet : ${JSON.stringify(packet)}`);
    return this.server.request(topic, packet, handler);
  }

  public subscribe(topicName: string, handler: (...args: any[]) => void) {
    console.log(`[${NatsMockClient.name}] - subscribe | topic : ${topicName} | handler : ${handler}`);
    this.server.subscribe(topicName, handler);
  }
}
