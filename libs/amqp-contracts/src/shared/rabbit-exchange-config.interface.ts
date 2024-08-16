export interface RabbitExchangeConfig {
  name: string;
  type: 'direct' | 'fanout' | 'topic' | 'headers';
  options?: AssertExchange;
}

interface AssertExchange {
  durable?: boolean;
  autoDelete?: boolean;
  internal?: boolean;
  alternateExchange?: string;
  arguments?: unknown | unknown[];
}
