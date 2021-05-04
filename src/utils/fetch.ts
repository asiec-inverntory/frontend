/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelizeKeys, decamelizeKeys } from 'humps';
import qs from 'qs';

const urlWithQuery = <T>(url: string, query: T) => (
  query
    ? `${url}?${qs.stringify(query)}`
    : url
);

const handlePostResponse = (resp: Response) => {
  if (resp.status >= 400 && resp.status < 500) throw new Error('Error 400');

  return resp.json().then((body) => ({
    body,
    headers: resp.headers,
    status: resp.ok,
  }));
};

// const handleErrors = (response: Response) => {
//   if (!response.ok)
//     throw new Error(`${response.status}:${response.statusText}`);

//   return response;
// };

export const get = (url: string, query?: any): Promise<any> => (
  new Promise<any>((resolve) => {
    fetch(query ? urlWithQuery<any>(url, query) : url)
      // .then(handleErrors)
      .then((resp) => resp.json())
      .then((body) => resolve(body));
  })
);


// Record<string, unknown> is equal to default object
export const post = (url: string, params: any): Promise<any> => (
  new Promise<any>((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(decamelizeKeys(params)),
    })
      .then((resp) => (handlePostResponse(resp)))
      .then(({ body, headers, status }) => resolve({
        status,
        headers,
        body: camelizeKeys(body || [{}]),
      }))
      .catch((error) => reject(error));
  })
);
