import http from "k6/http";
import {check} from "k6";

export default function () {
  let res = http.get("https://test-api.k6.io/public/crocodiles/");
  res = http.get("https://test-api.k6.io/public/crocodiles/7/");


  console.log(res.json());
  console.log(res.json().name)


  check(res, {
    "Status is 200": (r) => r.status === 200,
    "Crocodiles' name is Sobek": (r) => r.json().name === "Sobek",
    // not a very accurate method
    // it also works when getting the list of all crocodiles
    // "Crocodiles' name is Sobek": (r) => r.body.include === "Sobek",
  });
}
