import axios from 'axios'

const getDispatch = async (id, fleet_id, car_id, container_id) => {
  return await axios
    .get(`/api/dispatch`, {
      params: {
        id, // 司機id
        fleet_id, //車隊ID
        car_id, //車號ID
        container_id, //櫃號ID
      },
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const getRestaurantDetail = async (id) => {
  return await axios
    .get(`/api/webStore/${id}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const getDispatchDetail = async (id) => {
  return await axios
    .get(`/api/webDispatch/${id}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postUndelivered = async (id) => {
  return await axios
    .post(`/api/webStore/${id}/undelivered`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const postCheckOut = async (id) => {
  return await axios
    .post(`/api/dispatch/${id}/checkout`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getDispatch,
  getDispatchDetail,
  getRestaurantDetail,
  postUndelivered,
  postCheckOut,
}

export default ApiCaller
