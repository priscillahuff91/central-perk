const API_HOST = 'http://localhost:8080';

export const getItem = (route: string) => {
  return fetch(`${API_HOST}/${route}`).then(response => response.json());
};

export const postItem = (route: string, data: any) => {
  return fetch(`${API_HOST}/${route}`,
  {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  }).then(response => response.json());
};

export const deleteItem = (route: string, id: number) => {
  return fetch(`${API_HOST}/${route}/${id}`,
  {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  }).then(response => response.json());
};

export const putItem = (route: string, data: any) => {
  return fetch(`${API_HOST}/${route}/${data.id}`,
  {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  }).then(response => response.json());
};