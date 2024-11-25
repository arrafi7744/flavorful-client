import axios from "axios";

//Production
const baseURL = process.env.REACT_APP_BackendURL;
export default axios.create({
  baseURL: baseURL,
  //withCredentials: true,
  // withCredentials: false,
});

//dev
// export default axios.create({
//   headers: {
//     "Content-type": "application/json",
//   },
// });
