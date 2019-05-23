import { NatsMockClient } from './nats.client';
import { Observable, Subject } from 'rxjs';

export class NatsMockServer {
  private readonly delay: number;

  private readonly topics: Map<string, Observable<any>> = new Map();

  constructor(delay: number = 1000) {
    this.delay = delay;
  }

  public connect(client: NatsMockClient) {
    console.log(`[${NatsMockServer.name}] - connect`);
    setTimeout(() => client.emit('connect'), this.delay);
  }

  public publish(queue: string | undefined, message: any) {
    console.log(`[${NatsMockServer.name}] - publish | queue: ${queue} | message : ${JSON.stringify(message)}`);
  }

  public request(topicName: string, packet: any, handler: (...args: any[]) => void) {
    console.log(`[${NatsMockServer.name}] - subscribe | topic : ${topicName} | packet : ${packet}`);
    const topic = this.topics.get(topicName) as Subject<any>;
    const subscription = topic.subscribe(handler);
    setTimeout(() => topic.next(packet), this.delay);
    return subscription;
  }

  public subscribe(topicName: string, handler: (...args: any[]) => void) {
    console.log(`[${NatsMockServer.name}] - subscribe | topic : ${topicName} | handler : ${handler}`);
    const topic = (this.topics.has(topicName) ? this.topics.get(topicName) : this.createAndSaveTopic(topicName)) as Subject<any>;
    topic.subscribe(handler);
  }

  private createAndSaveTopic(name: string): Observable<any> {
    const topic: Observable<any> = new Subject();
    this.topics.set(name, topic);
    return topic;
  }
}
