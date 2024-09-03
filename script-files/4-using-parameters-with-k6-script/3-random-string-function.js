import http from "k6/http";
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  vus: 5,
  duration: "20s",
};

export default function () {
  const credential = {
    username: `test_${randomString(8)}`,
    password: `secret_${randomString(8)}`,
  };

  console.log(credential);

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post("https://test-api.k6.io/user/register/", JSON.stringify(credential), params);
}
