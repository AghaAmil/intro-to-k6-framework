import http from "k6/http";

export default function () {
  // using the get method of http
  const res = http.get("https://test.k6.io");

  // print the status code of the request
  console.log(`The Response Status Code = ${res.status}`);

  // print the body of the response
  console.log(res.body);
}
