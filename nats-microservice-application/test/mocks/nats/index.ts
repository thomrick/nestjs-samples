import { NatsMockClient } from './nats.client';
import { NatsMockServer } from './nats.server';

export class NatsMock {
  private readonly server: NatsMockServer;

  constructor() {
    this.server = new NatsMockServer();
  }

  public connect() {
    return new NatsMockClient(this.server);
  }
}
