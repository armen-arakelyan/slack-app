import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://localhost:8080/";

let authTokens = localStorage.getItem("user")
  ? localStorage.getItem("user")
  : undefined;
let refreshToken = localStorage.getItem("refresh")
  ? localStorage.getItem("refresh")
  : undefined;

const axiosInstance = axios.create({
  baseURL,
  headers: { authorization: `Bearer ${authTokens}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("acessToken")
      ? JSON.parse(localStorage.getItem("acessToken") || "")
      : null;
    req.headers.authorization = `Barer ${authTokens}`;
  }

  const user = jwt_decode(authTokens);

  const isExpried = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpried) return req;

  const res = await axios.post(baseURL + "refresh", { token: refreshToken });
  localStorage.setItem("user", res.data.user);
  localStorage.setItem("refresh", res.data.refreshToken);
  req.headers.authorization = `Barer ${res.data.user}`;
  return req;
});

export default axiosInstance;
