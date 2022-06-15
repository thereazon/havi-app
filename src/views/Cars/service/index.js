import axios from 'axios'

const getCars = async (id) => {
  return await axios
    .get(`/api/car/${id}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getCars,
}

export default ApiCaller
