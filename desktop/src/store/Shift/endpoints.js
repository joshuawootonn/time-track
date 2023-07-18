import { generateCRUDEndpoints } from '~/helpers/endpoint.helper'
import axios from '~/helpers/axios'
const DOMAIN = `shifts`

const CRUDendpoints = generateCRUDEndpoints(DOMAIN)

export const get = (id) => {
  return axios.get(`/${DOMAIN}/${id}?filter[include]=activities`)
}

export const post = (shift) => {
  return axios.post(`/${DOMAIN}?filter[include]=activities`, {
    ...shift,
  })
}

export const put = (shift) => {
  return axios.put(`/${DOMAIN}/${shift.id}?filter[include]=activities`, {
    ...shift,
  })
}

export const getCurrentShift = (employeeId) => {
  return axios.get(
    `/employees/${employeeId}/shifts?filter[limit]=1&filter[order]=id DESC`,
  )
}

export const getShiftsInRange = (startTime, endTime) => {
  return axios.get(
    `/shifts?filter[include][activities]&filter[where][and][0][clockInDate][gt]=${startTime}&filter[where][and][1][clockInDate][lt]=${endTime}`,
  )
}

export const getAll = (options) => {
  let url = `/shifts?filter[include][activities]`
  const { startTime, endTime, employeeId } = options

  if (startTime && endTime) {
    url += `&filter[where][and][0][clockInDate][gt]=${startTime}&filter[where][and][1][clockInDate][lt]=${endTime}`
  }
  if (employeeId !== -1) {
    url += `&filter[where][employeeId]=${employeeId}`
  }

  return axios.get(url)
  // return axios.get(
  //   `/shifts?filter[include][activities]&filter[where][and][0][clockInDate][gt]=${startTime}&filter[where][and][1][clockInDate][lt]=${endTime}`
  // );
}

export const deleteRelatedActivities = (id) => {
  return axios.delete(`/${DOMAIN}/${id}/activities`)
}

export default {
  ...CRUDendpoints,
  get,
  post,
  put,
}
