import axios from 'axios'

const getContainers = async (id, fleet_id, car_id, container_id) => {
  // car_id required!
  const queryString =
    car_id && container_id ? `&car_id=${car_id}&container_id=${container_id}` : car_id ? `&car_id=${car_id}` : ''

  return await axios
    .get(`/api/container?id=${id}&fleet_id=${fleet_id}${queryString}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getContainers,
}

export default ApiCaller
