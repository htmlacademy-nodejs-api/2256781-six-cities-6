export const getMongoURI = ({ login, password, host, port, base }: { [propertyName: string]: string }): string =>
  `mongodb://${login}:${password}@${host}:${port}/${base}?authSource=admin`;
