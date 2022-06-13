import axios from 'axios'

//mockdata should be used for testing
// const mockUserResponse = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         status: 'success',
//         data: {
//           id: 'DM5fe16c8fa0261',
//           name: '王曉明',
//           number: 'A12345678',
//           birthday: '0800101',
//           fleet_id: 'FM5fdc96995092e',
//           fleet: '夏暉車隊',
//           car_id: 'CI60336d477d81a',
//           container_id: 'CC1111111',
//           dc: [
//             {
//               code: 'NDC',
//               tel: '(03)322-3550',
//             },
//             {
//               code: 'CDC',
//               tel: '(04)894-1868',
//             },
//             {
//               code: 'VDC',
//               tel: '',
//             },
//           ],
//         },
//       })
//     }, 2000)
//   })

export const login = async (account, password) => {
  return await axios
    .post(`/api/user/login`, {
      account: account,
      password: password,
      type: 0,
      token: 'test-token2',
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}

export const postSecurityCode = async (code) => {
  return await axios
    .post(`/api/user/security_code`, {
      code,
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))
}
