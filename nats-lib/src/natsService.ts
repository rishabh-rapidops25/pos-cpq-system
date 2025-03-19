import { connect, NatsConnection, StringCodec, Subscription } from 'nats';
import { logger } from 'shared-constants';

class NatsService {
  private _client?: NatsConnection;

  async connect(server: string, clientId: string): Promise<void> {
    try {
      this._client = await connect({
        servers: server,
        name: clientId,
      });
      logger.info(`Connected to NATS server as ${clientId}`);
    } catch (err) {
      logger.error('Error while connecting to NATS server', err);
      throw err;
    }
  }

  get client(): NatsConnection {
    if (!this._client) {
      throw new Error('NATS client is not connected');
    }
    return this._client;
  }

  publish(subject: string, data: any): void {
    if (!this._client) {
      throw new Error('NATS client is not connected');
    }
    const sc = StringCodec();
    this._client.publish(subject, sc.encode(JSON.stringify(data)));
    logger.info(`Published message to subject: ${subject}`);
  }

  subscribe(subject: string, callback: (data: any) => void): Subscription {
    if (!this._client) {
      throw new Error('NATS client is not connected');
    }

    const subscription = this._client.subscribe(subject);
    const sc = StringCodec();

    (async () => {
      try {
        for await (const message of subscription) {
          const decodedMessage = JSON.parse(sc.decode(message.data));
          logger.info(`Received message from subject: ${subject}`);
          callback(decodedMessage);
        }
      } catch (err) {
        logger.error(
          `Error while subscribing to NATS subject ${subject}: ${
            err instanceof Error ? err.message : 'Unknown error'
          }`
        );
      }
    })();

    return subscription;
  }
}

export const natsService = new NatsService();
