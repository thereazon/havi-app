import axios from 'axios'

const checkIn = async (id, temperature) => {
  const data = {
    BAC: 1, // 暫時先填 1
    temperature,
  }

  return await axios
    .post(`/api/dispatch/${id}/checkin`, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  checkIn,
}

export default ApiCaller
