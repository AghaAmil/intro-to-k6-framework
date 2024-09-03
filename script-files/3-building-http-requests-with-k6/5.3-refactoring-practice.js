import http from "k6/http";

export default function () {
  // creating the body of API request
  const credential = {
    // the date in Unix Epoch format will be added to username in order to create unique IDs
    username: `test_${Date.now()}`,
    password: `secret_${Date.now()}`,
  };

  // headers is the same for both requests
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resCreation = http.post("https://test-api.k6.io/user/register/", JSON.stringify(credential), params);

  const resToken = http.post("https://test-api.k6.io/auth/token/login/", JSON.stringify(credential), params);

  console.log(resCreation.json().username);
  console.log(resToken.json().access);
}
