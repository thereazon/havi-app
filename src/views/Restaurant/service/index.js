import axios from 'axios'

const getRestaurantDetail = async (id) => {
  return await axios
    .get(`/api/webStore/${id}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const getDelivery = async (id) => {
  return await axios
    .get(`/api/webStore/${id}/delivery`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const getContainer = async (id) => {
  return await axios
    .get(`/api/webStore/${id}/container`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const getReturned = async (id) => {
  return await axios
    .get(`/api/webStore/${id}/returned`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const getOSND = async (id) => {
  return await axios
    .get(`/api/webStore/${id}/osnd`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postContainerFinish = async (id, data) => {
  return await axios
    .post(`/api/webContainer/${id}/finish`, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postContainerSend = async (id) => {
  return await axios
    .post(`/api/webContainer/${id}/send`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getRestaurantDetail,
  getDelivery,
  getContainer,
  getReturned,
  getOSND,
  postContainerFinish,
  postContainerSend,
}

export default ApiCaller
