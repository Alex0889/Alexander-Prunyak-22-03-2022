import { createException } from './createException';
import { IQuery } from './interfaces/IQuery';
import { queryStringBuilder } from './helpers';

export type SuccessResponse = {
  readonly cod: 200;
}

export type RejectResponse = {
  readonly cod: number;
  readonly message: string;
}

export default class Api {
  public constructor(private readonly baseUrl: string) {
  }

  public async GET<T>(url: string, payload?: Record<string, any>): Promise<T> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${url}?${queryStringBuilder(payload as IQuery[])}`, {
          method: 'GET',
        });

      if (response.ok) {
        try {
          const rawResponse = await response.json() as (SuccessResponse | RejectResponse);

          if (Boolean(rawResponse['cod']) && rawResponse.cod !== 200) {
            throw createException('ERROR', (rawResponse as RejectResponse).message);
          } else {
            return rawResponse as unknown as T;
          }
        } catch (e) {
          throw createException('E_UNABLE_TO_PARSE_JSON', `${this.baseUrl}/${url}`);
        }
      } else {
        const rawResponse = await response.json() as RejectResponse;
        throw createException('ERROR', (rawResponse as RejectResponse).message);
      }
    } catch (e) {
      throw createException('ERROR', (e as Error).message);
    }
  }


}