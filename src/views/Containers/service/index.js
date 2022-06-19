import axios from 'axios'

const getContainers = async (id, fleet_id, car_id, container_id) => {
  const params = {
    id, // 司機id
    fleet_id, //車隊ID
    car_id, //車號ID
    container_id, //櫃號ID ** Not required **
  }

  return await axios
    .get(`/api/container`, {
      params,
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getContainers,
}

export default ApiCaller
