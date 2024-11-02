import http from "k6/http";
import {check} from "k6";

export default function () {
  const res = http.get("https://test.k6.io");

  // sample assertion structure

//  check (true, {
//    'true is true': (value) => value === true
//  });
//
//  check (false, {
//    'true is true': (value) => value === true
//  });

  // inserting an assertion for request status code
  check(res, {
    "status is 200": (r) => r.status === 200,
    "body is not empty": (r) => r.body.length > 0,
  });
}
