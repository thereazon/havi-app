import axios from 'axios'

const getContainers = async (id, fleet_id, car_id, container_id) => {
<<<<<<< HEAD
  return await axios
    .get(`/api/container`, {
      data: {
        id, // 司機id
        fleet_id, //車隊ID
        car_id, //車號ID
        container_id, //櫃號ID
      },
=======
  const params = {
    id, // 司機id
    fleet_id, //車隊ID
    car_id, //車號ID
    container_id, //櫃號ID ** Not required **
  }

  return await axios
    .get(`/api/container`, {
      params,
>>>>>>> main
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getContainers,
}

export default ApiCaller
