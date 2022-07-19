import axios from 'axios'

const getTemperature = async (id, container) => {
  return await axios
    .get(`/api/car/${id}/temperature`, {
      params: {
        container,
      },
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const getPallet = async (id) => {
  return await axios
    .get(`/api/dispatch/${id}/pallet`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postPreCool = async (id, data) => {
  return await axios
    .post(`/api/dispatch/${id}/temperature`, data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postSecurityCode = async (code) => {
  return await axios
    .post(`/api/user/security_code`, {
      code,
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getPallet,
  postPreCool,
  getTemperature,
  postSecurityCode,
}

export default ApiCaller
