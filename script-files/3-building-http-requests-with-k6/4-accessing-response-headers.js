import http from "k6/http";
import { check } from "k6";

export default function () {
  let res = http.get("https://test-api.k6.io/public/crocodiles/");
  let crocodiles = res.json(); // Convert the list of all crocodiles to a JSON object
  let crocodileId = crocodiles[0]["id"]; // Get the ID of the first crocodile
  let crocodileName = crocodiles[0]["name"]; // Get the name of the first crocodile

  res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

  console.log(res.headers.Allow); // getting Allow in response header
  console.log(res.headers["Content-Type"]); // getting Content-Type in response header
  // console.log(res.headers.Content-Type); causing JS syntax error

  check(res, {
    "Status is 200": (r) => r.status === 200,
    "Crocodile's name ": (r) => r.json().name === crocodileName,
  });
}
