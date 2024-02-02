export const getMongoURI = ({ username, password, host, port, base }: { [propertyName: string]: string }): string =>
  `mongodb://${username}:${password}@${host}:${port}/${base}?authSource=admin`;

