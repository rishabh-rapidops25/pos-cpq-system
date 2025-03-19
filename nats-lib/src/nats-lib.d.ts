// src/nats-lib.d.ts
declare module 'nats-lib' {
  export class NatsService {
    connect(server: string, clientId: string): Promise<void>;
    publish(subject: string, data: any): void;
    subscribe(subject: string, callback: (data: any) => void): any;
  }
  export const natsService: NatsService;
}
