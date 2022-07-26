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

//GET 擷取溫度須call /api/car/{id}/temperature 車子即時溫度
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

//POST /api/webStore/{id}/temperature 餐廳鎖定溫度
const postLockTemperature = async (id, data) => {
  return await axios
    .post(`/api/webStore/${id}/temperature`, data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

//POST /api/webStore/{id}/temperature_finish 餐廳溫度完成
const postTemperatureFinish = async (id) => {
  return await axios
    .post(`/api/webStore/${id}/temperature_finish`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getRestaurantDetail,
  getDelivery,
  getContainer,
  getReturned,
  getOSND,
  getTemperature,
  postLockTemperature,
  postTemperatureFinish,
}

export default ApiCaller
