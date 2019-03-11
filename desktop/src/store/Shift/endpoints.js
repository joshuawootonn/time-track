import { HOST } from 'constants/network';
import { generateCRUDEndpoints } from 'helpers/endpoint.helper';
import axios from 'axios';
const DOMAIN = 'shifts';

// http://localhost:4000/api/employees/findone?filter[where][pin]=565656


const CRUDendpoints = generateCRUDEndpoints(DOMAIN);

export const get = id => {
  return axios.get(`${HOST}/${DOMAIN}/${id}?filter[include]=activities`);
};

export const post = shift => {
  return axios.post(`${HOST}/${DOMAIN}?filter[include]=activities`, { ...shift });
};

export const put = shift => {
  return axios.put(`${HOST}/${DOMAIN}/${shift.id}?filter[include]=activities`, { ...shift });
};

export const getCurrentShift = employeeId => {
  return axios.get(
    `${HOST}/employees/${employeeId}/shifts?filter[limit]=1&filter[order]=id DESC`,
  );
};

export const getShiftsInRange = (startTime, endTime) => {
  return axios.get(
    `${HOST}/shifts?filter[include][activities]&filter[where][and][0][clockInDate][gt]=${startTime}&filter[where][and][1][clockInDate][lt]=${endTime}` 
  );
};
export const deleteRelatedActivities = id => {
  return axios.delete(`${HOST}/${DOMAIN}/${id}/activities`);
};


export default {
  ...CRUDendpoints,
  get,post,put
};