import axios from 'axios'

const getDispatch = async (id, fleet_id, car_id, container_id) => {
  return await axios
    .get(`/api/dispatch`, {
      data: {
        id, // 司機id
        fleet_id, //車隊ID
        car_id, //車號ID
        container_id, //櫃號ID
      },
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getDispatch,
}

export default ApiCaller