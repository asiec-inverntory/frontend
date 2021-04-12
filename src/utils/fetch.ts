import qs from 'qs';

const urlWithQuery = <T>(url: string, query: T) => (
  query
    ? `${url}?${qs.stringify(query)}`
    : url
);

// const handleErrors = (response: Response) => {
//   if (!response.ok)
//     throw new Error(`${response.status}:${response.statusText}`);

//   return response;
// };

// if you don't understand what is <T> then google 'typescript generics'
export const get = <T>(url: string, query: T): Promise<T> => (
  new Promise<T>((resolve) => {
    fetch(urlWithQuery<T>(url, query))
      // .then(handleErrors)
      .then((resp) => resp.json())
      .then((body) => resolve(body));
  })
);
