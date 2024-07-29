import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95)<300"], // p(95) should be less than 300 milliseconds
    http_req_duration: ["max < 1000"], // max duration request should be less than 1 second
    http_req_failed: ["rate<0.01"], // rate of failure should be less than 1%
    http_reqs: ["count>20"], // the number of total requests should be grater than 20
    http_reqs: ["rate>4"], // the number of total requests per second should be grater than 20
    vus: ["value>9"], // the number of virtual users should be grater than 9
  },
};

export default function () {
  const res = http.get("https://test.k6.io");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "page is homepage": (r) => r.body.includes("Collection of simple web-pages suitable for load testing."),
  });
  sleep(2);
}
