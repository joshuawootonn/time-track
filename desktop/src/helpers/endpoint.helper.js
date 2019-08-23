import axios from 'helpers/axios';

export const generateCRUDEndpoints = domain => {
  return {
    getAll: () => {
      return axios.get(`/${domain}`);
    },
    get: id => {
      return axios.get(`/${domain}/${id}`);
    },
    put: employee => {
      return axios.put(`/${domain}/${employee.id}`, { ...employee });
    },
    post: employee => {
      return axios.post(`/${domain}`, { ...employee });
    },
    delet: id => {
      return axios.delete(`/${domain}/${id}`);
    }
  };
};
