import qs from 'qs';

import { AJAXGetQuery } from './types';

const urlWithQuery = (url: string, query: AJAXGetQuery) => (
  query
    ? `${url}?${qs.stringify(query)}`
    : url
);

const handleErrors = (response: Response) => {
  if (!response.ok)
    throw new Error(`${response.status}:${response.statusText}`);

  return response;
};

export const get = <T>(url: string, query: AJAXGetQuery): Promise<T> => (
  new Promise<T>((resolve) => {
    fetch(urlWithQuery(url, query))
      .then(handleErrors)
      .then((resp) => resp.json())
      .then((body) => resolve(body));
  })
);
