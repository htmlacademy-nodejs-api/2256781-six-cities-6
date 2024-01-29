import convict from 'convict';

export type TRestSchema = {
  PORT: number;
}

export const configRestSchema = convict<TRestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
});
