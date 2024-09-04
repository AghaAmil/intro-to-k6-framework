import http from "k6/http";
import { check } from "k6";
import { SharedArray } from "k6/data";
import { randomItem } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

const userCredentials = new SharedArray("Users with credentials", function () {
  return JSON.parse(open("../users/users.json")).users;
});

console.log(userCredentials);

export default function () {
  userCredentials.forEach((item) => {
    const credentials = {
      username: item.username,
      password: item.password,
    };

    let resCreate = http.post("https://test-api.k6.io/user/register/", JSON.stringify(credentials), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    check(resCreate, {
      "status is 201": (r) => r.status === 201,
    });
  });

  const randomCredential = randomItem(userCredentials);

  let resToken = http.post(
    "https://test-api.k6.io/auth/token/login/",
    JSON.stringify({
      username: randomCredential.username,
      password: randomCredential.password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(resToken, {
    "status is 200": (r) => r.status === 200,
    "has access token": (r) => r.json() !== undefined,
  });
}
