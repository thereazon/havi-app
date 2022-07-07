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

const postPallet = async (id, data) => {
  return await axios
    .post(`/api/dispatch/${id}/pallet`, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getPallet,
  postPallet,
  getTemperature,
}

export default ApiCaller
