import http from "k6/http";
import { check } from "k6";

export default function () {
  const res = http.get("https://test.k6.io");

  // inserting an assertion
  //   check(true, {
  //     "Check True or False": (value) => value === true,
  //   });

  // inserting an assertion for request status code
  check(res, {
    "status is 200": (r) => r.status === 200,
    "body is not empty": (r) => r.body.length > 0,
  });
}
