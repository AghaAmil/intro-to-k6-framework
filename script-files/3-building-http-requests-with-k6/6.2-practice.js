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

  let userName = resCreation.json().username;
  let accessToken = resToken.json().access;

  const resCrocodileCreation = http.post(
    "https://test-api.k6.io/my/crocodiles/",
    JSON.stringify({
      name: "Crocs Khafan",
      sex: "M",
      date_of_birth: "1990-09-15",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  let createdCrocodileId = resCrocodileCreation.json().id;

  console.log(`The Created Username Is "${userName}"`);
  console.log(resCrocodileCreation.json());

  const resGetCrocodile = http.get(`https://test-api.k6.io/my/crocodiles/${createdCrocodileId}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(resGetCrocodile.json());
}
