import http from "k6/http";

export default function () {
  // creating the body of API request
  const body = JSON.stringify({
    username: `test_${Date.now()}`, // the date in Unix Epoch format will be added to username in order to create unique IDs
    password: "test",
  });

  // creating the headers of API request
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  http.post("https://test-api.k6.io/user/register/", body, params);
}
