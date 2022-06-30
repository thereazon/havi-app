import axios from 'axios'

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
}

export default ApiCaller
