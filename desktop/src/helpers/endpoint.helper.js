import axios from '~/helpers/axios'

export const generateCRUDEndpoints = (domain) => {
  return {
    getAll: () => {
      return axios.get(`/${domain}`)
    },
    get: (id) => {
      return axios.get(`/${domain}/${id}`)
    },
    put: (object) => {
      return axios.put(`/${domain}/${object.id}`, { ...object })
    },
    patch: (object) => {
      return axios.patch(`/${domain}/${object.id}`, { ...object })
    },
    post: (data) => {
      return axios.post(`/${domain}`, { ...data })
    },
    delet: (id) => {
      return axios.delete(`/${domain}/${id}`)
    },
  }
}
