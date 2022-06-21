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

const ApiCaller = {
  getTemperature,
}

export default ApiCaller
