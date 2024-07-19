import http from "k6/http";
import { sleep } from "k6";

// setting a configuration for load test
export const options = {
  vus: 10, // number of virtual users
  duration: "10s", // load test duration
};

export default function () {
  http.get("https://test.k6.io");
  // pausing after a request is sent
  sleep(1); // pauses for 1 second
}
