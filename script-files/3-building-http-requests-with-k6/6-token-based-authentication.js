import http from "k6/http";

export default function () {
  // Create the body of the API request
  const credential = {
    // The date in Unix Epoch format will be added to the username to create unique IDs
    username: `test_${Date.now()}`,
    password: `secret_${Date.now()}`,
  };

  // Define headers for both requests
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Step 1: User registration
  const resCreation = http.post(
    "<https://test-api.k6.io/user/register/>",
    JSON.stringify(credential),
    params
  );

  // Step 2: User login to obtain the token
  const resToken = http.post(
    "<https://test-api.k6.io/auth/token/login/>",
    JSON.stringify(credential),
    params
  );

  // Extract username and token from the responses
  let userName = resCreation.json().username;
  let Token = resToken.json().access;
  console.log(userName);
  console.log(Token);

  // Step 3: Access the private endpoint using the token
  const resPrivate = http.get("<https://test-api.k6.io/my/crocodiles/>", {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  // Log the response from the private endpoint
  console.log(resPrivate.body);
}
