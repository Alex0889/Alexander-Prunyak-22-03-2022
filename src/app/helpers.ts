import { IQuery } from './interfaces/IQuery';

export const queryStringBuilder = (queries: IQuery[]): string => {
  let res = '';
  if (Boolean(queries)) {
    queries.forEach(query => {
      res += `${query.name}=${query.value}&`;
    });
  }
  return res;
}