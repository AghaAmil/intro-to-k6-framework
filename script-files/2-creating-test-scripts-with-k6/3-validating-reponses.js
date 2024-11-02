import http from "k6/http";
import {check} from "k6";

export default function () {
  const res = http.get("https://test.k6.io");

  // causing error to demonstrate the result of body validation
  // const res = http.get("https://test.k6.io/contacts.php");

  console.log(res.body)

  // checks can be used in a separate check() methods
  //  check(res, {
  //    "status is 200": (r) => r.status === 200,
  //  });
  //
  //  check(res, {
  //    "page is startpage": (r) => r.body.includes("Collection of simple web-pages suitable for load testing."),
  //  });

  // inserting proper assertion for validating responses
  check(res, {
    "status is 200": (r) => r.status === 200,
    "page is startpage": (r) => r.body.includes("Collection of simple web-pages suitable for load testing."),
  });
}
