type TMongoURI = {
  [prop: string]: string
};

export const getMongoURI = ({ login, password, host, port, base }: TMongoURI): string =>
  `mongodb://${login}:${password}@${host}:${port}/${base}?authSource=admin`;
