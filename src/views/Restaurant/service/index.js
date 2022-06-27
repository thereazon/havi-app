import axios from 'axios'

const getStoreDetail = async (id) => {
  return await axios
    .get(`/api/store/${id}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postArrival = async (id) => {
  return await axios
    .post(`/api/store/${id}/arrival`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postTemperature = async (id) => {
  return await axios
    .post(`/api/store/${id}/temperature`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

// 無法配送-延後配送
const postDelayed = async (id) => {
  return await axios
    .post(`/api/store/${id}/delayed`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

// 無法配送-攜回DC
const postBring = async (id) => {
  return await axios
    .post(`/api/store/${id}/bring`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postOSND = async (id) => {
  return await axios
    .post(`/api/store/${id}/osnd`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postContainer = async (id, data) => {
  return await axios
    .post(`/api/store/${id}/osnd`, {
      data,
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postReturned = async (id, data) => {
  return await axios
    .post(`/api/store/${id}/returned`, {
      data,
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postFile = async (id, data) => {
  return await axios
    .post(`/api/store/${id}/file`, {
      data,
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getStoreDetail,
  postArrival,
  postTemperature,
  postDelayed,
  postBring,
  postOSND,
  postContainer,
  postReturned,
  postFile,
}

export default ApiCaller
