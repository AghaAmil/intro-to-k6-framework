import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95) < 300"], // p(95) should be less than 300 milliseconds
    my_counter: ["count > 10"], // the number of counter (request) should be grater than 10
  },
};

// define a simple counter metric and call it "my_counter"
let myCounter = new Counter("my_counter");

export default function () {
  const res = http.get("https://test.k6.io");

  // using add method to simple add numbers and count with each iteration
  myCounter.add(1);

  sleep(2);
}
