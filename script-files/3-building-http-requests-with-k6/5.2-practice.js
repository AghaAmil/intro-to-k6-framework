import http from "k6/http";

export default function () {
  // creating the body of API request
  const bodyCreation = JSON.stringify({
    username: `test_${Date.now()}`, // the date in Unix Epoch format will be added to username in order to create unique IDs
    password: "test",
  });

  // headers is the same for both requests
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resCreation = http.post("https://test-api.k6.io/user/register/", bodyCreation, params);
  let userName = resCreation.json().username;

  const bodyToken = JSON.stringify({
    username: `${userName}`,
    password: "test",
  });

  const resToken = http.post("https://test-api.k6.io/auth/token/login/", bodyToken, params);

  console.log(resToken.json().access);
}
