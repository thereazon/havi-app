import axios from 'axios'

const getRestaurantDetail = async (id) => {
  return await axios
    .get(`/api/webStore/${id}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

// const mockGetDeliveryResponse = (id) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         status: 'success',
//         data: [
//           {
//             id: 'DO600e91e62ae45',
//             date: '01/25/2021',
//             no: 'DR2020120001',
//             cube: 2000,
//             ctn: 50,
//             items: [...Array(30).keys()].map((x) => ({
//               rec_no: `000${x}`,
//               temp_zone: ['C', 'D', 'F'][Math.floor(Math.random() * 3)],
//               wrin: `00010${x}`,
//               item_desc: `麥香雞醬-A${x}`,
//               qty: 5,
//               uom: '箱',
//               type: 1,
//               data: [
//                 {
//                   uid: 'DOI600e91e6306fb',
//                   exp: '021821',
//                   batch_no: '20201222',
//                   uom: '箱',
//                   qty: 5,
//                 },
//               ],
//             })),
//           },
//         ],
//       })
//     }, 2000)
//   })
// }

const getDelivery = async (id) => {
  return await axios
    .get(`/api/webStore/${id}/delivery`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const getContainer = async (id) => {
  return await axios
    .get(`/api/webStore/${id}/container`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const getReturned = async (id) => {
  return await axios
    .get(`/api/webStore/${id}/returned`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const getOSND = async (id) => {
  return await axios
    .get(`/api/webStore/${id}/osnd`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

const ApiCaller = {
  getRestaurantDetail,
  getDelivery,
  getContainer,
  getReturned,
  getOSND,
}

export default ApiCaller
